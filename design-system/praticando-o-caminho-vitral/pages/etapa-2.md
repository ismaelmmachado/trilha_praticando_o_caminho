# Page Override: Etapa 2 (Passos 9-17) — Verde 🟢

> **Override Priority:** This file overrides `MASTER.md` when building pages for Etapa 2.

## Color Overrides

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Accent | `#22C55E` | `--color-accent` |
| On Accent | `#FFFFFF` | `--color-on-accent` |
| Accent Soft | `#DCFCE7` | `--color-accent-soft` |
| Accent Border | `rgba(34, 197, 94, 0.15)` | `--color-accent-border` |
| Accent Hover | `rgba(34, 197, 94, 0.08)` | `--color-accent-hover` |

## Visual Identity
- Tema: **Verde Natureza** — crescimento, frutificação, envio
- Sensação: Vida, maturidade, prática, missão
- Ícone: 🌱 (representado por SVG de broto/árvore)

## Component Overrides

### Step Badge
```css
.step-badge.etapa-2 {
  background: #DCFCE7;
  color: #166534;
  border-color: rgba(34, 197, 94, 0.2);
}
```

### Progress Indicator
```css
.progress-bar.etapa-2 {
  background: #22C55E;
}
```
