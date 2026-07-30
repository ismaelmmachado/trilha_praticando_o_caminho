# Padrão de Seções — Passo (Formato Novo)

## Estrutura (ordem fixa)

| Ordem | Seção | Ícone | Conteúdo | Fonte dos dados |
|-------|-------|-------|----------|-----------------|
| 1 | Para Começar | 📖 | Resumo acolhedor extraído da apostila + botão download PDF | JSON (único por passo) |
| 2 | Ferramentas para o Caminho | 🛠️ | Lista fixa: Bible App, Lectio 365, Spotify Vitral | Hardcoded no gerador (igual todos) |
| 3 | Ouça | 🎧 | Embed Spotify ou "Em breve" | JSON (único por passo) |
| 4 | Aprofunde | 📚 | 2 itens: Livro Sugerido + Música Sugerida | JSON (único por passo) |
| 5 | Pratique | 🎯 | Convite acolhedor + pergunta da semana | JSON (único por passo) |
| 6 | Organize-se | 📋 | Grid 7 dias (Seg-Dom) com temas ou "Em breve" | JSON (único por passo) |

## Regras

1. **Fallback**: se campo vazio, mostrar "Em breve"
2. **Redundância**: Pratique NÃO repete a oração da apostila — é um convite leve + pergunta
3. **Ferramentas**: fixo em todos os passos (hardcoded), pois a pessoa pode entrar em qualquer passo
4. **Tom**: Regra de Ouro — simples, acolhedor, sem jargões, NVT nas citações

## Modelo de Dados (JSON)

```json
{
  "para_comecar": {
    "resumo": "string — extraído da seção 'Para Começar' da apostila",
    "apostila_pdf": "string — url para download do PDF"
  },
  "ouca": {
    "titulo": "string — título do áudio/podcast",
    "spotify_url": "string — url do Spotify ou vazio"
  },
  "aprofunde": {
    "livro": {
      "titulo": "string",
      "autor": "string",
      "url": "string — ou vazio"
    },
    "musica": {
      "titulo": "string",
      "artista": "string",
      "url": "string — ou vazio"
    }
  },
  "pratique": {
    "convite": "string — acolhedor, uma ação possível para a semana",
    "pergunta": "string — uma pergunta para levar na semana",
    "instrucoes": "string — oração original (fallback se convite vazio)"
  },
  "organizese": {
    "dias": [
      { "dia": "Segunda-feira", "tema": "", "leitura": "" },
      { "dia": "Terça-feira", "tema": "", "leitura": "" },
      { "dia": "Quarta-feira", "tema": "", "leitura": "" },
      { "dia": "Quinta-feira", "tema": "", "leitura": "" },
      { "dia": "Sexta-feira", "tema": "", "leitura": "" },
      { "dia": "Sábado", "tema": "", "leitura": "" },
      { "dia": "Domingo", "tema": "", "leitura": "" }
    ]
  }
}
```

## Detecção de formato

- Se `passo.para_comecar` existe → **formato novo** (usa renderizadores novos)
- Se não → **formato legado** (usa renderizadores antigos: Medite, Assista, etc.)

## Gerador

Localizado em `scripts/gerar-passos.js`. A função `gerarPagina()` decide qual formato usar:

```
isNewFormat = !!passo.para_comecar;
```

Renderizadores do novo formato:

| Função | Renderiza |
|--------|-----------|
| `renderParaComecar()` | Resumo + botão download |
| `renderParaTeAjudar()` | Ferramentas fixas (hardcoded) |
| `renderOuca()` | Spotify embed ou "Em breve" |
| `renderAprofunde()` | Lista de recursos (livro + música) |
| `renderPratique()` | Convite + pergunta (ou fallback instruções) |
| `renderOrganizese()` | Grid 7 dias |

## Histórico

| Data | Versão | Mudança |
|------|--------|---------|
| 2026-07-30 | v1.0 | Definição inicial do formato novo |
