import zipfile
import xml.etree.ElementTree as ET
import json
import re
import os
import glob

TMP_DIR = '/tmp'
LIVRO_TITULO = 'Praticando o Caminho'
LIVRO_AUTOR = 'John Mark Comer'

CAPITULOS_POR_PASSO = {
    1: 'Introdução, Cap. 1-2',
    2: 'Cap. 3-4',
    3: 'Cap. 5-6',
    4: 'Cap. 7-8',
    5: 'Cap. 9-10',
    6: 'Cap. 11-12',
    7: 'Cap. 13-14',
    8: 'Cap. 15-16',
    9: 'Cap. 17',
    10: 'Cap. 18',
    11: 'Cap. 19',
    12: 'Cap. 20',
    13: 'Cap. 21',
    14: 'Cap. 22',
    15: 'Cap. 23',
    16: 'Cap. 24',
    17: 'Cap. 25',
}

def extrair_texto_docx(path):
    z = zipfile.ZipFile(path)
    xml_content = z.read('word/document.xml')
    root = ET.fromstring(xml_content)
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    paragrafos = []
    for p in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
        textos = []
        for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
            if t.text:
                textos.append(t.text)
        linha = ''.join(textos).strip()
        if linha:
            paragrafos.append(linha)
    return paragrafos

def encontrar_linha(linhas, padrao, inicio=0):
    for i in range(inicio, len(linhas)):
        if re.search(padrao, linhas[i], re.IGNORECASE):
            return i
    return None

def extrair_entre(linhas, inicio, fim_padroes):
    resultado = []
    for i in range(inicio, len(linhas)):
        if any(re.search(p, linhas[i], re.IGNORECASE) for p in fim_padroes):
            break
        resultado.append(linhas[i])
    return '\n'.join(resultado).strip()

def extrair_dados_passo(linhas):
    dados = {}
    
    dados['titulo'] = ''
    if linhas:
        m = re.match(r'ESTAÇÃO\s*2\s*[—–-]\s*PASSO\s+(\d+)\s*[—–-]\s*(.+)', linhas[0], re.IGNORECASE)
        if m:
            dados['id'] = int(m.group(1))
            dados['titulo'] = m.group(2).strip()
    
    if not dados.get('titulo'):
        return None
    
    if len(linhas) > 1:
        if re.search(r'Etapa\s*1', linhas[1], re.IGNORECASE):
            dados['etapa'] = 1
        elif re.search(r'Etapa\s*2', linhas[1], re.IGNORECASE):
            dados['etapa'] = 2
        else:
            dados['etapa'] = 1
    
    # Extrair devocional (MEDITE) — para at "O QUE VOC EST LEVANDO?"
    idx_para_comecar = encontrar_linha(linhas, r'PARA\s*COME[CÇ]AR')
    if idx_para_comecar is not None:
        dados['devocional'] = extrair_entre(linhas, idx_para_comecar + 1, [r'O\s+QUE\s+VOC[EÊ]\s+EST[ÁA]\s+LEVANDO'])
    
    # Extrair oraao (PRATIQUE) — linha exata "ORAÇÃO" (sozinha)
    idx_oracao = None
    for i, linha in enumerate(linhas):
        if re.match(r'^ORA[CÇ][AÃ]O\s*$', linha, re.IGNORECASE):
            idx_oracao = i
            break
    if idx_oracao is not None:
        oracao_texto = extrair_entre(linhas, idx_oracao + 1, [r'^ANEXO', r'^VERS[ÍI]CULOS', r'O\s+QUE\s+ESTOU\s+LEVANDO', r'DESAFIO\s+PARA\s+A?\s+SEMANA', r'^$'])
        if oracao_texto:
            dados['oracao'] = oracao_texto
    
    # Extrair versculos (MEDITE base_biblica)
    idx_versiculos = encontrar_linha(linhas, r'VERS[ÍI]CULOS?\s*PARA\s*APROFUNDAR')
    if idx_versiculos is not None:
        versiculos = []
        for i in range(idx_versiculos + 1, min(idx_versiculos + 15, len(linhas))):
            linha = linhas[i].strip()
            
            if re.search(r'^(PERGUNTAS|O\s+QUE\s+ESTOU|DESAFIO|PR[ÓO]XIMO|ANEXO)', linha, re.IGNORECASE):
                break
            if not linha:
                continue
            
            m = re.match(r'[“"](.+?)[”"]\s*[—–-]\s*(.+?)(?:\s*[—–-])?$', linha)
            if m:
                versiculos.append(f'{m.group(1)} — {m.group(2)}')
            else:
                versiculos.append(linha)
        dados['versiculos'] = '; '.join(versiculos) if versiculos else ''
    
    # Extrair desafio (ORGANIZE-SE)
    idx_desafio = encontrar_linha(linhas, r'DESAFIO\s*PARA\s*A?\s*SEMANA')
    if idx_desafio is not None:
        desafio_texto = extrair_entre(linhas, idx_desafio + 1, [r'PR[ÓO]XIMO\s*PASSO', r'^$'])
        if desafio_texto:
            dados['desafio'] = desafio_texto
    
    # Subtítulo a partir do tema central do ttulo
    titulo = dados.get('titulo', '')
    subtitulos = {
        'O CONVITE PARA SER APRENDIZ': 'O começo da jornada com Jesus',
        'A FORMAÇÃO QUE COMEÇA EM DEUS': 'Deus nos forma enquanto vivemos',
        'O CAMINHO DA TRANSFORMAÇÃO': 'A transformação acontece pela prática',
        'AS PRÁTICAS QUE NOS FORMAM': 'As 9 práticas espirituais',
        'DOR E SOFRIMENTO': 'Trazendo a dor à luz',
        'CURA DO PECADO': 'Confissão e cura',
        'MINHA REGRA DE VIDA': 'Um ritmo pessoal para a caminhada',
        'VIDA EM COMUNIDADE': 'Caminhando com outros',
        'O DESCANSO COMO RITMO DE GRAÇA': 'A prática do descanso semanal',
        'O RITMO DA ORAÇÃO': 'Cultivando um ritmo de oração',
        'O JEJUM COMO ESPAÇO PARA DEUS': 'Jejum como prática de dependência',
        'O SILÊNCIO COMO ESPAÇO SAGRADO': 'Criando espaço para ouvir Deus',
        'A GENEROSIDADE COMO ESTILO DE VIDA': 'Confrontando a lógica do consumo',
        'A MEDITAÇÃO COMO LEITURA ORANTE': 'Lendo a Bíblia de forma lenta e orante',
        'A COMUNIDADE COMO CORPO DE CRISTO': 'Vivendo como corpo de Cristo',
        'O SERVIÇO COMO EXPRESSÃO DO REINO': 'Servir como expressão do Reino',
        'O TESTEMUNHO COMO COERÊNCIA DE VIDA': 'Testemunho como coerência de vida',
    }
    dados['subtitulo'] = ''
    for chave, val in subtitulos.items():
        if chave in titulo.upper():
            dados['subtitulo'] = val
            break
    
    return dados

def main():
    docx_files = sorted(glob.glob(os.path.join(TMP_DIR, 'doc_*PASSO*.docx')))
    
    if not docx_files:
        docx_files = sorted(glob.glob(os.path.join(TMP_DIR, 'doc_*.docx')))
    
    passos_extraidos = {}
    
    for fpath in docx_files:
        try:
            linhas = extrair_texto_docx(fpath)
            dados = extrair_dados_passo(linhas)
            if dados and 'id' in dados:
                passos_extraidos[dados['id']] = dados
                print(f"  OK  Passo {dados['id']}: {dados['titulo']}")
            else:
                print(f"  FAIL {os.path.basename(fpath)}: no data extracted")
        except Exception as e:
            print(f"  ERROR {os.path.basename(fpath)}: {e}")
    
    passos_lista = []
    for pid in range(1, 18):
        if pid in passos_extraidos:
            d = passos_extraidos[pid]
            medite_devocional = d.get('devocional', '')
            passos_lista.append({
                'id': pid,
                'titulo': d['titulo'].title() if d['titulo'].isupper() else d['titulo'],
                'subtitulo': d.get('subtitulo', ''),
                'etapa': d.get('etapa', 1),
                'status': 'aberto',
                'semana': pid,
                'medite': {
                    'base_biblica': d.get('versiculos', ''),
                    'devocional': medite_devocional
                },
                'assista': {
                    'titulo': d['titulo'].title() if d['titulo'].isupper() else d['titulo'],
                    'url': ''
                },
                'aprofunde': [{
                    'tipo': 'livro',
                    'titulo': LIVRO_TITULO,
                    'autor': LIVRO_AUTOR,
                    'url': ''
                }],
                'pratique': {
                    'desafio': '',
                    'instrucoes': d.get('oracao', '')
                },
                'organizese': {
                    'dias': [{
                        'dia': 'Desafio da Semana',
                        'tema': d.get('desafio', ''),
                        'leitura': ''
                    }]
                }
            })
        else:
            print(f"  MISSING Passo {pid}: not found in extracted data")
    
    etapas = [
        {'id': 1, 'titulo': 'Curso Base', 'cor': 'amarela', 'passos': [1, 2, 3, 4, 5, 6, 7, 8]},
        {'id': 2, 'titulo': 'As 9 Práticas', 'cor': 'verde', 'passos': [9, 10, 11, 12, 13, 14, 15, 16, 17]},
    ]
    
    output = {
        'etapas': etapas,
        'passos': passos_lista
    }
    
    output_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'dados', 'passos.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"\nGerado: {output_path}")
    print(f"Total: {len(passos_lista)} passos")

if __name__ == '__main__':
    main()
