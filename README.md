# Trilha Praticando o Caminho — Comunidade Vitral

Minisite da jornada de discipulado **Praticando o Caminho** da **Comunidade Vitral**. Acompanha 17 passos em 2 etapas com conteúdo digital entre os encontros presenciais.

## Jornada

| Etapa | Passos | Tema | Cor |
|-------|--------|------|-----|
| 1 — Início da Jornada | 1 a 8 | Fundamentos do discipulado | 🟡 Amarela |
| 2 — As 9 Práticas | 9 a 17 | Práticas da vida cristã | 🟢 Verde |

Cada passo contém 6 seções fixas:

1. **Para Começar** — resumo acolhedor + botão de download da apostila
2. **Ferramentas para o Caminho** — apps e ferramentas de apoio (Bible App, Lectio 365, Spotify)
3. **Ouça** — podcast/áudio da semana (embed Spotify)
4. **Aprofunde** — livro sugerido + música sugerida
5. **Pratique** — experimento semanal + pergunta para refletir
6. **Organize-se** — grade de segunda a domingo com ações diárias

## Site

🌐 **https://ismaelmmachado.github.io/trilha_praticando_o_caminho/**

Hospedado via GitHub Pages (branch `main`, raiz).

## Stack

HTML + CSS + JS puro (estático). Zero dependências. Dados em JSON.

```
/
├── index.html              # Home (etapas + grid de passos + transição)
├── passo-{1..17}.html      # Páginas estáticas geradas (1 por passo)
├── mapa.html               # Mapa da jornada (perguntas, dicas e estrutura)
├── complementar.html       # Material complementar
├── favicon.svg             # Favicon do site (gradiente amarelo→verde)
├── dados/
│   └── passos.json         # Conteúdo real dos 17 passos
├── scripts/
│   ├── gerar-passos.js     # Gerador de páginas estáticas dos passos
│   ├── gerar-readme.js     # Gera a tabela de passos do README a partir do JSON
│   ├── extrair_apostilas.py# Extrator de conteúdo DOCX → JSON
│   └── migrar-passos.js    # Script one-off (criação do conteúdo dos passos)
├── css/
│   ├── tokens.css          # Design tokens (variáveis CSS)
│   └── estilo.css          # Componentes e layout
├── js/
│   └── app.js              # Renderização da home + transição Etapa 1→2
└── design-system/
    └── praticando-o-caminho-vitral/
        ├── MASTER.md       # Design system global
        └── pages/
            ├── etapa-1.md  # Override etapa amarela
            └── etapa-2.md  # Override etapa verde
```

## Conteúdo

Todo o conteúdo do site foi extraído das 17 apostilas originais (formato docx) via `scripts/extrair_apostilas.py`. **Nada foi inventado** — seções sem conteúdo das apostilas permanecem como placeholders ("Em breve").

- 1 seção de transição entre Etapa 1 e Etapa 2 (conteúdo do Guia de Transição)
- Mapa da Jornada com perguntas, dicas e estrutura (conteúdo da Apostila do Mapa)

## Status de Lançamento (MVP)

Versão MVP pronta para publicação. O que está **pronto**:

- Textos dos 17 passos: resumo, devocional, base bíblica, experimento, pergunta e oração
- Mapa da Jornada e Material Complementar
- 6 seções por passo, placeholders "Em breve" uniformes, acessibilidade e links verificados

O que **aguarda material** (veja `docs/checklist-lancamento-mvp.md`):

- Vídeos, áudios Spotify, músicas sugeridas, links de livros, grade semanal e PDFs das apostilas

## Design System

Gerado com a skill global [UI-UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (`~/.opencode/skills/ui-ux-pro-max`).

| Token | Valor |
|-------|-------|
| Tipografia | Playfair Display (títulos) + Inter (corpo) |
| Estilo | Soft UI Evolution + Minimalism |
| Etapa 1 (accent) | `#EAB308` |
| Etapa 2 (accent) | `#0d9466` |
| Background | `#FAFAF8` |
| Texto | `#1C1917` |
| Muted | `#78716C` |

## Passos

Tabela **gerada a partir de `dados/passos.json`** pelo script `node scripts/gerar-readme.js` — não edite manualmente (edite o JSON e rode o script).

<!-- PASSOS-START -->
| # | Título | Etapa | Status |
|---|--------|-------|--------|
| 1 | O Convite Para Ser Aprendiz | 1 | ✅ Aberto |
| 2 | A Formação Que Começa Em Deus | 1 | ✅ Aberto |
| 3 | O Caminho Da Transformação | 1 | ✅ Aberto |
| 4 | As Práticas Que Nos Formam | 1 | ✅ Aberto |
| 5 | Dor E Sofrimento | 1 | ✅ Aberto |
| 6 | Cura Do Pecado | 1 | ✅ Aberto |
| 7 | Minha Regra De Vida | 1 | ✅ Aberto |
| 8 | Vida Em Comunidade | 1 | ✅ Aberto |
| 9 | O Descanso Como Ritmo De Graça | 2 | ✅ Aberto |
| 10 | O Ritmo Da Oração | 2 | ✅ Aberto |
| 11 | O Jejum Como Espaço Para Deus | 2 | ✅ Aberto |
| 12 | O Silêncio Como Espaço Sagrado | 2 | ✅ Aberto |
| 13 | A Generosidade Como Estilo De Vida | 2 | ✅ Aberto |
| 14 | A Meditação Como Leitura Orante | 2 | ✅ Aberto |
| 15 | A Comunidade Como Corpo De Cristo | 2 | ✅ Aberto |
| 16 | O Serviço Como Expressão Do Reino | 2 | ✅ Aberto |
| 17 | O Testemunho Como Coerência De Vida | 2 | ✅ Aberto |
<!-- PASSOS-END -->

## Frase-guia

> *"Esteja com Jesus, Torne-se como Ele, Faça como Ele fez."*

## Como Rodar

```bash
python3 -m http.server 8080
```

Acessar http://localhost:8080

## Salvamento (Git)

Consulte [`AGENTS.md`](AGENTS.md) para regras detalhadas de commit, branch e tag.
