# Trilha Praticando o Caminho — Comunidade Vitral

Minisite da jornada de discipulado **Praticando o Caminho** da **Comunidade Vitral**. Acompanha 17 passos em 2 etapas com conteúdo digital entre os encontros presenciais.

## Jornada

| Etapa | Passos | Tema | Cor |
|-------|--------|------|-----|
| 1 — Curso Base | 1 a 8 | Fundamentos do discipulado | 🟡 Amarela |
| 2 — As 9 Práticas | 9 a 17 | Práticas da vida cristã | 🟢 Verde |

Cada passo contém 5 seções fixas:

1. **Medite** — base bíblica + devocional
2. **Assista** — vídeo/mensagem do encontro
3. **Aprofunde** — livros, músicas e materiais complementares
4. **Pratique** — desafio prático da semana
5. **Organize-se** — plano diário de leitura e reflexão

## Stack

HTML + CSS + JS puro (estático). Zero dependências. Dados em JSON.

```
/
├── index.html              # Home
├── passo.html              # Template único de passo (?id=1..17)
├── facilitador.html        # Guia do facilitador
├── complementar.html       # Material complementar
├── dados/
│   └── passos.json         # Conteúdo dos 17 passos
├── css/
│   ├── tokens.css          # Design tokens (variáveis CSS)
│   └── estilo.css          # Componentes e layout
├── js/
│   ├── app.js              # Renderização da home
│   └── passos.js           # Renderização do passo individual
└── design-system/
    └── praticando-o-caminho-vitral/
        ├── MASTER.md       # Design system global
        └── pages/
            ├── etapa-1.md  # Override etapa amarela
            └── etapa-2.md  # Override etapa verde
```

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
| 1 | O Grande Amor | 1 | ✅ Aberto |
| 2 | O Chamado | 1 | ✅ Aberto |
| 3 | A Graça | 1 | ✅ Aberto |
| 4 | A Fé | 1 | ✅ Aberto |
| 5 | O Novo Nascimento | 1 | ✅ Aberto |
| 6 | O Fruto do Espírito | 1 | ✅ Aberto |
| 7 | A Oração | 1 | ✅ Aberto |
| 8 | A Palavra | 1 | ✅ Aberto |
| 9 | Comunhão | 2 | ✅ Aberto |
| 10 | Serviço | 2 | ✅ Aberto |
| 11 | Mordomia | 2 | ⏳ Breve |
| 12 | Discipulado | 2 | ⏳ Breve |
| 13 | Evangelismo | 2 | ⏳ Breve |
| 14 | Generosidade | 2 | ⏳ Breve |
| 15 | Perseverança | 2 | ⏳ Breve |
| 16 | Testemunho | 2 | ⏳ Breve |
| 17 | Missão | 2 | ⏳ Breve |

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
