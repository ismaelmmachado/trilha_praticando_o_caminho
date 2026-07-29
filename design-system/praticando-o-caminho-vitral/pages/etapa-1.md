# Page Override: Etapa 1 (Passos 1-8) — Amarela 🟡

> **Override Priority:** This file overrides `MASTER.md` when building pages for Etapa 1.

## Color Overrides

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Accent | `#EAB308` | `--color-accent` |
| On Accent | `#0F172A` | `--color-on-accent` |
| Accent Soft | `#FEF3C7` | `--color-accent-soft` |
| Accent Border | `rgba(234, 179, 8, 0.15)` | `--color-accent-border` |
| Accent Hover | `rgba(234, 179, 8, 0.08)` | `--color-accent-hover` |

## Visual Identity
- Tema: **Amarelo Quente** — acolhedor, iluminado, descoberta
- Sensação: Calor, começo, fundamentos, luz
- Ícone: ☀️ (representado por SVG de sol/luz)

## Component Overrides

### Step Badge
```css
.step-badge.etapa-1 {
  background: #FEF3C7;
  color: #92400E;
  border-color: rgba(234, 179, 8, 0.2);
}
```

### Progress Indicator
```css
.progress-bar.etapa-1 {
  background: #EAB308;
}
```
