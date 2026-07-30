# Page Override: Etapa 2 (Passos 9-17) — Verde 🟢

> **Override Priority:** This file overrides `MASTER.md` when building pages for Etapa 2.

## Color Overrides

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Accent | `#0d9466` | `--color-accent` |
| On Accent | `#FFFFFF` | `--color-on-accent` |
| Accent Soft | `rgba(13, 148, 102, 0.08)` | `--color-accent-soft` |
| Accent Border | `rgba(13, 148, 102, 0.10)` | `--color-accent-border` |
| Accent Hover | `rgba(13, 148, 102, 0.14)` | `--color-accent-hover` |

## Visual Identity
- Tema: **Verde Natureza** — crescimento, frutificação, envio
- Sensação: Vida, maturidade, prática, missão
- Ícone: 🌱 (representado por SVG de broto/árvore)

## Component Overrides

### Step Badge
```css
.step-badge.etapa-2 {
  background: rgba(13, 148, 102, 0.08);
  color: #0b6f4d;
  border-color: rgba(13, 148, 102, 0.10);
}
```

### Progress Indicator
```css
.progress-bar.etapa-2 {
  background: #0d9466;
}
```
