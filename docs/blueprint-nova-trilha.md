# Blueprint — Nova Trilha de Discipulado

> Use este documento como referência para criar uma nova trilha seguindo a mesma arquitetura, design system e pipeline de `Praticando o Caminho`, mas com conteúdo próprio.

---

## 1. Visão Geral

**Stack:**
- HTML semântico + CSS puro (sem frameworks)
- Design tokens via CSS custom properties
- Geração de páginas via Node.js (script único)
- Deploy estático (GitHub Pages / qualquer CDN)

**Público-alvo:** Comunidade Vitral — discipulado em pequenos grupos
**Idioma:** Português (PT-BR)

---

## 2. Estrutura de Diretórios

```
/
├── index.html               # Página inicial (landing page da trilha)
├── complementar.html        # Material complementar (livros, podcasts, guias)
├── mapa.html                # Mapa da jornada (perguntas, dicas, estrutura)
├── passo-1.html .. 17.html  # Páginas de cada passo (geradas automaticamente)
├── passo.html               # Redirect para passo-1.html (opcional)
├── favicon.svg              # Favicon do site (SVG, gradiente por etapa)
│
├── css/
│   ├── tokens.css           # Design tokens (fontes, cores, espaçamento, sombras)
│   ├── estilo.css           # Estilos globais (layout, componentes, seções)
│   ├── complementar.css     # Estilos específicos da página complementar
│   └── mapa.css             # Estilos específicos da página do mapa
│
├── scripts/
│   ├── gerar-passos.js      # Gerador: JSON → HTML estático
│   ├── extrair_apostilas.py # Extrator de conteúdo DOCX → JSON
│   └── migrar-passos.js     # Script one-off (criação do conteúdo dos passos)
│
├── dados/
│   └── passos.json          # Dados estruturados de todos os passos
│
├── apostilas/
│   └── *.md                 # Arquivos fonte da apostila (referência para resumos)
│
├── assets/                  # Imagens, ícones, PDFs (opcional)
│
├── design-system/
│   └── praticando-o-caminho-vitral/
│       └── MASTER.md        # Documentação do design system
│
└── docs/
    └── padrao-secoes-passo.md   # Contrato visual e de dados por seção
```

---

## 3. Design System

### 3.1 Tipografia

```css
--font-heading: 'Playfair Display', Georgia, serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

Fonte Google: `Playfair Display` (títulos) + `Inter` (corpo).

### 3.2 Cores Neutras

```css
--color-bg:      #FAFAF8;     /* Fundo da página */
--color-surface: #FFFFFF;     /* Cards, seções */
--color-text:    #1C1917;     /* Texto principal */
--color-muted:   #78716C;     /* Texto secundário */
--color-border:  rgba(28,25,23,0.08);  /* Bordas sutis */
```

### 3.3 Cores de Acento (variam por etapa)

Cada etapa da trilha tem sua própria paleta de acento, definida via `data-etapa` no `<html>`:

| Token | Função |
|-------|--------|
| `--accent` | Cor principal do acento (botões, badges) |
| `--accent-soft` | Fundo sutil (pills, cards) |
| `--accent-border` | Borda sutil |
| `--accent-hover` | Hover de links/botões |
| `--accent-text` | Texto com cor de acento |
| `--accent-gradient` | Gradiente para botão de download |

**Exemplo — Etapa 1 (amarelo) e Etapa 2 (verde):**

```css
[data-etapa="1"] {
  --accent: #EAB308;
  --accent-soft: #FEF3C7;
  --accent-border: rgba(234, 179, 8, 0.15);
  --accent-hover: rgba(234, 179, 8, 0.08);
  --accent-text: #92400E;
  --accent-gradient: linear-gradient(135deg, #EAB308, #854D0E);
}

[data-etapa="2"] {
  --accent: #0d9466;
  --accent-soft: rgba(13, 148, 102, 0.08);
  --accent-border: rgba(13, 148, 102, 0.10);
  --accent-hover: rgba(13, 148, 102, 0.14);
  --accent-text: #0b6f4d;
  --accent-gradient: linear-gradient(135deg, #0d9466, #0b6f4d);
}
```

**Para adaptar:** crie um `[data-etapa="N"]` para cada etapa da sua trilha, escolhendo cores coerentes com sua identidade visual.

### 3.4 Espaçamento

```css
--space-xs: 4px;   --space-sm: 8px;   --space-md: 16px;
--space-lg: 24px;  --space-xl: 32px;  --space-2xl: 48px;  --space-3xl: 64px;
```

### 3.5 Raio (border-radius)

```css
--radius-sm: 8px;   --radius-md: 12px;   --radius-lg: 16px;
--radius-full: 9999px;
```

### 3.6 Sombra

```css
--shadow-lg: 0 8px 24px rgba(0,0,0,0.08);
```

> Nota: o `tokens.css` atual define apenas estes tokens (raio `sm/md/lg/full`, sombra `lg`). Para uma nova trilha, adicione níveis extras se necessário.

### 3.7 Container

```css
--container: 1200px;     /* Largura máxima do layout */
--content-max: 720px;    /* Largura máxima do conteúdo de leitura */
```

---

## 4. Componentes

### 4.1 Header / Navegação

Duas variantes, sempre presentes:

- **`.site-header`** — visível em telas ≥ 768px, com `.nav` (links: Início, Material Complementar, Mapa)
- **`.mobile-header`** — visível em telas < 768px, com `.mobile-nav` (mesmo links, versão curta)

Padrão de links no nav:
```html
<nav class="nav" role="navigation" aria-label="Navegação principal">
  <a href="index.html">Início</a>
  <a href="complementar.html">Material Complementar</a>
  <a href="mapa.html">Mapa</a>
</nav>
```

### 4.2 Breadcrumb

Presente em todas as páginas internas (passos, complementar, guia):

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="index.html">Início</a>
  <span class="breadcrumb-sep">/</span>
  <span>Nome da Página</span>
</nav>
```

### 4.3 Skip Link

Primeiro elemento do `<body>`:

```html
<a class="skip-link" href="#main">Ir para o conteúdo</a>
```

### 4.4 Seções do Passo (6 seções fixas)

Cada página de passo segue exatamente esta ordem:

| # | Seção | Classe CSS | Descrição |
|---|-------|-----------|-----------|
| 1 | **Para Começar** | `.para-comecar` + `.para-comecar-footer` com `.download-btn` | Resumo + link para PDF da apostila |
| 2 | **Ferramentas** | `.ferramentas-section` → `.ferramentas-list` → `.ferramenta-item` | Lista de ferramentas/recursos |
| 3 | **Ouça** | `.ouca-section` → `.ouca-placeholder` ou `.spotify-embed` | Player de áudio (placeholder ou embed) |
| 4 | **Aprofunde** | `.aprofunde-section` → `.aprofunde-list` → `.aprofunde-item` | Livro + música relacionados |
| 5 | **Pratique** | `.pratique-section` → `.pratique-experimento` + `.pratique-pergunta` | Experimento (ação) + Pergunta (reflexão) |
| 6 | **Organize-se** | `.organize-section` → `.week-plan-grid` → `.week-day-card` | Grid de 7 dias (Seg–Dom) |

### 4.5 Cards (Ferramentas, Aprofunde)

```html
<div class="ferramenta-item">
  <div class="ferramenta-item-content">
    <div class="ferramenta-icon">📖</div>
    <div class="ferramenta-info">
      <strong>Título</strong>
      <span>Descrição</span>
    </div>
  </div>
  <a href="..." class="ferramenta-link">Acessar</a>
</div>
```

### 4.6 Grid Semanal (Organize-se)

```html
<div class="week-plan-grid">
  <div class="week-day-card">
    <strong>Seg</strong>
    <span>Texto do dia</span>
  </div>
  <!-- ... Dom -->
</div>
```

Dias vazios usam classe `.day-empty` com `font-style: italic`.

### 4.7 Download Button

```html
<a href="..." class="download-btn" download>
  <span class="download-icon">↓</span>
  Baixar Apostila
</a>
```

Usa `var(--accent-gradient)` como fundo.

---

## 5. Modelo de Dados

Arquivo `dados/passos.json` — objeto com `etapas` (array) e `passos` (array de passos). Estrutura real de cada passo:

```json
{
  "id": 1,
  "titulo": "Título do Passo",
  "subtitulo": "Subtítulo curto",
  "etapa": 1,
  "status": "aberto",
  "semana": 1,
  "medite": {
    "base_biblica": "Citações (NVT) separadas por '; ' com '—' antes da referência",
    "devocional": "Texto devocional completo do passo (multilinha)"
  },
  "assista": {
    "titulo": "Título do vídeo",
    "url": "https://..."  // vazio → seção não renderizada no formato novo
  },
  "aprofunde": {
    "livro": {
      "titulo": "Título do Livro",
      "autor": "Autor",
      "url": "https://..."  // vazio → botão "Em breve"
    },
    "musica": {
      "titulo": "Título da Música",
      "artista": "Artista",
      "url": "https://..."  // vazio → botão "Em breve"
    }
  },
  "pratique": {
    "desafio": "",            // não usado no formato novo
    "experimento": "Ação concreta e possível para a semana",
    "pergunta": "Pergunta reflexiva (para levar no bolso)",
    "instrucoes": "Oração original (fallback legado)"
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
  },
  "para_comecar": {
    "resumo": "Texto acolhedor (abertura, NÃO o devocional inteiro)",
    "apostila_pdf": ""   // "" ou "/apostilas/passo-N.pdf"; vazio → botão "Em breve"
  },
  "ouca": {
    "titulo": "Título do áudio/podcast",
    "spotify_url": "https://open.spotify.com/embed/..."  // vazio → "Em breve"
  }
}
```

**Regras de renderização (formato novo — detectado por `passo.para_comecar`):**

- Seções renderizadas: Para Começar → Ferramentas → Ouça → Aprofunde → Pratique → Organize-se → Navegação.
- **Ferramentas** são fixas/hardcoded no gerador (Bible App, Lectio 365, Vitral no Spotify) — não vêm do JSON.
- `medite` e `assista` são preservados no JSON (fonte das apostilas), mas **não são renderizados no formato novo**.
- Se `para_comecar` ausente, o gerador usa o **formato legado** (Medite + Assista).
- Campos vazios (`url`, `spotify_url`, `apostila_pdf`, `tema`, etc.) exibem "Em breve".

**Campos obrigatórios:** `id`, `titulo`, `subtitulo`, `etapa`, `status`, `semana`, `medite`, `assista`, `aprofunde`, `pratique`, `organizese`, `para_comecar`, `ouca`.

**Campos opcionais:** conteúdo de `url`/`spotify_url`/`apostila_pdf`/`musica.*` (podem ficar vazios até existir material).

---

## 6. Generator Pipeline

### 6.1 Funcionamento

`scripts/gerar-passos.js` lê `dados/passos.json` e gera um arquivo `passo-N.html` para cada entrada.

**Etapas do pipeline:**

1. Ler `dados/passos.json`
2. Para cada passo:
   a. Extrair `data-etapa` com base em `passo.etapa`
   b. Renderizar template HTML completo com:
      - Header (site + mobile)
      - Breadcrumb
      - 6 seções a partir dos dados
   c. Escrever `passo-{id}.html`
3. Log de sucesso

### 6.2 Template (esqueleto)

```html
<!DOCTYPE html>
<html lang="pt-BR" data-etapa="{etapa}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{titulo} · {Nome da Trilha}</title>
  <link rel="icon" href="favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="css/tokens.css" />
  <link rel="stylesheet" href="css/estilo.css" />
</head>
<body>
  <!-- Skip link -->
  <!-- Site header com nav -->
  <!-- Mobile header com nav -->
  <!-- Breadcrumb -->
  <!-- Conteúdo: 6 seções -->
</body>
</html>
```

### 6.3 Como adaptar

1. Copie `scripts/gerar-passos.js` e `dados/passos.json` para o novo projeto
2. Substitua `{Nome da Trilha}` no template
3. Ajuste a lógica de `data-etapa` se sua trilha tiver mais/menos etapas
4. Rode: `node scripts/gerar-passos.js`

---

## 7. Convenções

### Nomenclatura

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Páginas de passo | `passo-{id}.html` | `passo-1.html` |
| CSS de página | `css/{nome}.css` | `css/complementar.css` |
| Dados | `dados/passos.json` | — |
| Script de geração | `scripts/gerar-passos.js` | — |
| Apostilas | `apostilas/ETAPA-{N}-PASSO-{ID}-TITULO.md` | `apostilas/ETAPA-2-PASSO-1-O_CONVITE.md` |

### Atributos

- `<html>` sempre com `data-etapa="N"` (N = número da etapa)
- Navegação usa `aria-label` e `role`
- Skip link como primeiro elemento do `<body>`
- Botões e links com `min-height: 44px` (touch target)
- Logo com `aria-label` descritivo

### Caminhos

- Todos os links CSS são relativos: `css/tokens.css`, `css/estilo.css`
- Links de navegação: `index.html` (mesmo diretório)
- Links de PDF/apostila: `apostilas/nome.pdf`

---

## 8. Checklist de Adaptação

| Passo | Ação | Arquivos |
|-------|------|----------|
| 1 | Definir nome da trilha e identidade visual | — |
| 2 | Criar `dados/passos.json` com seus passos (sem conteúdo da apostila original) | `dados/passos.json` |
| 3 | Escolher cores de acento para cada etapa e atualizar `tokens.css` | `css/tokens.css` |
| 4 | Se necessário, trocar as fontes headig/body | `css/tokens.css` |
| 5 | Copiar `css/estilo.css` — não precisa alterar | `css/estilo.css` |
| 6 | Copiar `css/complementar.css` e `css/mapa.css` — ajustar se necessário | `css/*.css` |
| 7 | Copiar `scripts/gerar-passos.js` — alterar nome da trilha no template e regenerar | `scripts/gerar-passos.js` |
| 8 | Criar `index.html` personalizado (pode copiar e adaptar) | `index.html` |
| 9 | Criar `complementar.html` e `mapa.html` adaptados | — |
| 10 | Colocar apostilas PDF em `apostilas/` e preencher `para_comecar.apostila_pdf` (até existirem, deixar `""` → botão "Em breve") | `apostilas/*.pdf`, `dados/passos.json` |
| 11 | Rodar `node scripts/gerar-passos.js` para gerar todas as páginas | — |
| 12 | Publicar (GitHub Pages, Netlify, etc.) | — |
| 13 | Criar `favicon.svg` e referenciar via `<link rel="icon">` no `<head>` das páginas estáticas e no template do gerador | `favicon.svg`, `scripts/gerar-passos.js` |

---

## 9. Exemplo Mínimo

```json
{
  "id": 1,
  "titulo": "Meu Primeiro Passo",
  "subtitulo": "O início da jornada",
  "etapa": 1,
  "status": "aberto",
  "semana": 1,
  "medite": {
    "base_biblica": "Citação na NVT — Referência",
    "devocional": "Texto devocional (pode ficar vazio no exemplo mínimo)."
  },
  "assista": {
    "titulo": "Meu Primeiro Passo",
    "url": ""
  },
  "aprofunde": {
    "livro": { "titulo": "Título", "autor": "Autor", "url": "" },
    "musica": { "titulo": "", "artista": "", "url": "" }
  },
  "pratique": {
    "desafio": "",
    "experimento": "Faça algo concreto esta semana.",
    "pergunta": "O que essa experiência te ensinou?",
    "instrucoes": "Oração de encerramento (pode ficar vazia)."
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
  },
  "para_comecar": {
    "resumo": "Este é o ponto de partida da nossa trilha.",
    "apostila_pdf": ""
  },
  "ouca": {
    "titulo": "Meu Primeiro Passo",
    "spotify_url": ""
  }
}
```

---

> **Próximo passo:** copie este blueprint para o novo repositório, siga o checklist de adaptação (seção 8), e use o exemplo mínimo (seção 9) para validar o pipeline antes de preencher o conteúdo completo.
