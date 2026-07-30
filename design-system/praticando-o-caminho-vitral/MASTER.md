# Design System — Praticando o Caminho

> Gerado em 2026-07-30

## Tokens (css/tokens.css)

### Tipografia
| Token | Valor |
|-------|-------|
| `--font-heading` | `'Playfair Display', Georgia, serif` |
| `--font-body` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |

### Cores neutras
| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg` | `#FAFAF8` | Fundo da página |
| `--color-surface` | `#FFFFFF` | Cards, seções |
| `--color-text` | `#1C1917` | Texto principal |
| `--color-muted` | `#78716C` | Texto secundário |
| `--color-border` | `rgba(28,25,23,0.08)` | Bordas sutis |

### Cores de acento (variam por etapa)
| Token | Etapa 1 (amarelo) | Etapa 2 (verde) |
|-------|-------------------|------------------|
| `--accent` | `#EAB308` | `#0d9466` |
| `--accent-soft` | `#FEF3C7` | `rgba(13,148,102,0.08)` |
| `--accent-border` | `rgba(234,179,8,0.15)` | `rgba(13,148,102,0.10)` |
| `--accent-hover` | `rgba(234,179,8,0.08)` | `rgba(13,148,102,0.14)` |
| `--accent-text` | `#92400E` | `#0b6f4d` |
| `--accent-gradient` | `linear(135deg,#EAB308,#854D0E)` | `linear(135deg,#0d9466,#0b6f4d)` |

### Espaçamento
`--space-{xs,sm,md,lg,xl,2xl,3xl}` = `{4,8,16,24,32,48,64}px`

### Raio
`--radius-{sm,md,lg,xl,full}` = `{8,12,16,24,9999}px`

### Sombra
`--shadow-{sm,md,lg,xl}` — 4 níveis progressivos

## Estrutura de Página
- `.site-header` + `.mobile-header` com nav responsiva
- `.container` (max-width: 1200px) + `.content-container` (max-width: 720px para leitura)
- Skip link, ARIA labels, breadcrumb
- 6 seções por passo: Para Começar → Ferramentas → Ouça → Aprofunde → Pratique → Organize-se

## Anti-Patterns
- ❌ Cores de acento hardcoded (usar `var(--accent-*)`)
- ❌ CSS duplicado (ex: `.download-btn` definido 2x)
- ❌ Inline styles sem necessidade
