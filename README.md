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
├── facilitador.html        # Guia do facilitador (10 seções + checklist)
├── complementar.html       # Material complementar
├── dados/
│   └── passos.json         # Conteúdo real dos 17 passos
├── scripts/
│   └── gerar-passos.js     # Gerador de páginas estáticas dos passos
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

Todo o conteúdo do site foi extraído das 17 apostilas originais (formato docx) via `scripts/extrair_apostilas.py`. **Nada foi inventado** — seções sem conteúdo das apostilas permanecem como placeholders (vídeos, links do livro).

- 2 seções de transição entre Etapa 1 e Etapa 2 (conteúdo do Guia de Transição)
- Guia do Facilitador com 10 seções + checklist (conteúdo da Apostila do Facilitador)

## Design System

Gerado com [UI-UX Pro Max](../.opencode/skills/ui-ux-pro-max).

| Token | Valor |
|-------|-------|
| Tipografia | Playfair Display (títulos) + Inter (corpo) |
| Estilo | Soft UI Evolution + Minimalism |
| Etapa 1 (accent) | `#EAB308` |
| Etapa 2 (accent) | `#22C55E` |
| Background | `#FAFAF8` |
| Texto | `#1C1917` |
| Muted | `#78716C` |

## Passos

| # | Título | Etapa | Status |
|---|--------|-------|--------|
| 1 | O Convite Para Ser Aprendiz | 1 | ✅ Aberto |
| 2 | A Formação Que Começa Em Deus | 1 | ✅ Aberto |
| 3 | O Caminho da Transformação | 1 | ✅ Aberto |
| 4 | As Práticas que nos Formam | 1 | ✅ Aberto |
| 5 | Dor e Sofrimento | 1 | ✅ Aberto |
| 6 | Cura do Pecado | 1 | ✅ Aberto |
| 7 | Minha Regra de Vida | 1 | ✅ Aberto |
| 8 | Vida em Comunidade | 1 | ✅ Aberto |
| 9 | O Descanso como Ritmo de Graça | 2 | ✅ Aberto |
| 10 | O Ritmo da Oração | 2 | ✅ Aberto |
| 11 | O Jejum como Espaço para Deus | 2 | ✅ Aberto |
| 12 | O Silêncio como Espaço Sagrado | 2 | ✅ Aberto |
| 13 | A Generosidade como Estilo de Vida | 2 | ✅ Aberto |
| 14 | A Meditação como Leitura Orante | 2 | ✅ Aberto |
| 15 | A Comunidade como Corpo de Cristo | 2 | ✅ Aberto |
| 16 | O Serviço como Expressão do Reino | 2 | ✅ Aberto |
| 17 | O Testemunho como Coerência de Vida | 2 | ✅ Aberto |

## Frase-guia

> *"Esteja com Jesus, Torne-se como Ele, Faça como Ele fez."*

## Como Rodar

```bash
python3 -m http.server 8080
```

Acessar http://localhost:8080

## Salvamento (Git)

- Branch padrão: `homologacao`
- Tags automáticas por contexto (feature, fix, refactor, chore, docs)
- Comando: `git add . && git commit -m "<tipo>: <descrição>" && git tag <tag> && git push origin homologacao --tags`
