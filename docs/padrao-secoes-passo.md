# Padrão de Seções — Passo (Formato Novo)

## Estrutura (ordem fixa)

| Ordem | Seção | Ícone | Conteúdo | Fonte dos dados |
|-------|-------|-------|----------|-----------------|
| 1 | Para Começar | 📖 | Resumo acolhedor extraído da apostila + botão download PDF | JSON (único por passo) |
| 2 | Ferramentas para o Caminho | 🛠️ | Lista: Bible App, Lectio 365, Spotify Vitral | JSON (array compartilhado `ferramentas`, igual todos) |
| 3 | Ouça | 🎧 | Embed Spotify ou "Em breve" | JSON (único por passo) |
| 4 | Aprofunde | 📚 | 2 itens: Livro Sugerido + Música Sugerida | JSON (único por passo) |
| 5 | Pratique | 🎯 | Experimento simples (Ação) + Pergunta da Semana | JSON (único por passo) |
| 6 | Organize-se | 📋 | Grid 7 dias (Seg-Dom) com temas ou "Em breve" | JSON (único por passo) |

## Regras

1. **Fallback**: se campo vazio, mostrar "Em breve"
2. **Redundância**: Pratique NUNCA repete a oração da apostila — é um experimento leve (ação concreta e possível) + pergunta para levar no bolso
3. **Ferramentas**: vêm do JSON (array compartilhado `ferramentas` no topo do arquivo), iguais em todos os passos, pois a pessoa pode entrar em qualquer passo
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
    "experimento": "string — ação concreta e possível para a semana, tom acolhedor",
    "pergunta": "string — pergunta para levar no bolso, sem resposta definitiva",
    "instrucoes": "string — oração original (fallback se experimento vazio)"
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

**Chave de topo do arquivo (fora de cada passo) — Ferramentas:**

```json
"ferramentas": [
  { "icon": "📖", "nome": "Bible App (YouVersion)", "descricao": "A Bíblia no seu bolso. Siga a Comunidade Vitral.", "link": "https://www.bible.com/organizations/79172d03-a943-4051-aebf-285b525546f1", "rotulo": "Baixar" },
  { "icon": "🙏", "nome": "Lectio 365", "descricao": "Devocional diário em português. Ore com a Bíblia.", "link": "https://lectio365.com/pt-br/o-aplicativo/", "rotulo": "Baixar" },
  { "icon": "🎙️", "nome": "Vitral no Spotify", "descricao": "Podcast da Comunidade Vitral para sua jornada.", "link": "https://open.spotify.com/show/1prjsrcxPho9otrP1VUWT4", "rotulo": "Ouvir" }
]
```

`renderFerramentas()` lê esse array e renderiza para todos os passos. Se vazio → placeholder "Em breve".

## Detecção de formato

- Se `passo.para_comecar` existe → **formato novo** (usa renderizadores novos)
- Se não → **formato legado** (usa renderizadores antigos: Medite, Assista, etc.)

### Regra específica do Pratique

- Se `passo.pratique.experimento` existe → renderiza novo formato (experimento + pergunta)
- Se não → renderiza fallback legado (`desafio` + `instrucoes`)

### Estrutura visual do Pratique (novo formato)

| Elemento | Conteúdo |
|----------|----------|
| Título da seção | "Pratique" + ícone 🎯 |
| Bloco "Praticar" | Card com o texto do `experimento` — uma ação simples, acolhedora, sem meta |
| Bloco "Pergunta da semana" | Card destacado com label "Pergunta da semana:" + texto da `pergunta` — tom convidativo, missional, aponta para relacionamento |

## Gerador

Localizado em `scripts/gerar-passos.js`. A função `gerarPagina()` decide qual formato usar:

```
isNewFormat = !!passo.para_comecar;
```

Renderizadores do novo formato:

| Função | Renderiza |
|--------|-----------|
| `renderParaComecar()` | Resumo + botão download |
| `renderFerramentas()` | Ferramentas (JSON compartilhado `ferramentas`) |
| `renderOuca()` | Spotify embed ou "Em breve" |
| `renderAprofunde()` | Lista de recursos (livro + música) |
| `renderPratique()` | Experimento + pergunta (ou fallback legado) |
| `renderOrganizese()` | Grid 7 dias |

## Layout / Visual Contract

Cada seção segue a estrutura HTML e classes CSS abaixo. Manter fielmente ao replicar.

### Para Começar

```html
<div class="step-section">
  <div class="step-section-header">
    <div class="section-icon">📖</div>
    <h2>Para Começar</h2>
  </div>
  <div class="step-section-content">
    <p>{resumo}</p>
    <div class="para-comecar-footer">
      <a href="{pdf_url}" class="download-btn" target="_blank" download>
        <span class="download-icon">↓</span>
        Baixar Apostila em PDF
      </a>
    </div>
  </div>
</div>
```

- `.download-btn`: gradiente 135deg `#0d9466 → #0b6f4d`, box-shadow `0 14px 30px` verde, border-radius 999px, min-height 54px, font-weight 700, hover translateY(-2px)
- `.para-comecar-footer`: border-top 1px solid `var(--color-border)`, margin-top `var(--space-lg)`, padding-top `var(--space-md)`

### Ferramentas para o Caminho

```html
<div class="step-section">
  <div class="step-section-header">
    <div class="section-icon">🛠️</div>
    <h2>Ferramentas para o Caminho</h2>
  </div>
  <div class="step-section-content">
    <p class="ferramentas-intro">Ferramentas que podem apoiar sua caminhada:</p>
    <div class="ferramentas-list">
      <div class="ferramenta-item">
        <div class="ferramenta-item-content">
          <span class="ferramenta-icon">📖</span>
          <div class="ferramenta-info">
            <strong>Bible App (YouVersion)</strong>
            <span>A Bíblia no seu bolso. Siga a Comunidade Vitral.</span>
          </div>
        </div>
        <a class="ferramenta-link" href="https://..." target="_blank">Baixar</a>
      </div>
      <!-- + Lectio 365 + Vitral no Spotify -->
    </div>
  </div>
</div>
```

- `.ferramenta-item`: flex space-between, padding 14px, border-radius 16px, bg linear-gradient(180deg, #fff, #fbfcfa), border 1px rgba(13,148,102,.08)
- `.ferramenta-icon`: 40×40px, border-radius 12px, bg rgba(13,148,102,.08), flex-shrink 0
- `.ferramenta-link`: min-height 36px, border-radius 999px, color `#0b6f4d`, font-weight 700, bg rgba(13,148,102,.08)

### Ouça

```html
<div class="step-section">
  <div class="step-section-header">
    <div class="section-icon">🎧</div>
    <h2>Ouça: {titulo}</h2>
  </div>
  <div class="step-section-content">
    <div class="ouca-placeholder">
      <iframe class="spotify-embed" src="{spotify_url}" allowfullscreen></iframe>
      <!-- fallback (sem inline style): -->
      <p>Em breve</p>
    </div>
  </div>
```

> Estilo do fallback via CSS: `.ouca-placeholder p` (muted, padding 2rem, centralizado). Não usar inline style.

- `.ouca-placeholder`: aspect-ratio 16/9, border-radius `var(--radius-md)`, bg `var(--color-bg)`, border 1px `var(--color-border)`, flex centered
- `.spotify-embed`: width 100%, height 100%, border none, border-radius `var(--radius-md)`

### Aprofunde

```html
<div class="step-section">
  <div class="step-section-header">
    <div class="section-icon">📚</div>
    <h2>Aprofunde</h2>
  </div>
  <div class="step-section-content">
    <div class="aprofunde-list">
      <div class="aprofunde-item">
        <div class="aprofunde-item-content">
          <span class="aprofunde-item-icon">📖</span>
          <div class="aprofunde-item-info">
            <strong>{titulo}</strong>
            <span>{autor} · Livro Sugerido</span>
          </div>
        </div>
        <a class="aprofunde-link" href="{url}" target="_blank">Acessar</a>
        <!-- fallback: <span class="aprofunde-link is-empty">Em breve</span> -->
      </div>
      <!-- + Música Sugerida -->
    </div>
  </div>
</div>
```

- `.aprofunde-item`: flex space-between, padding 16px, border-radius 18px, bg linear-gradient(180deg, #fff, #fbfcfa), border 1px rgba(13,148,102,.08)
- `.aprofunde-item-icon`: 44×44px, border-radius 14px, bg rgba(13,148,102,.08), font-size 1.2rem
- `.aprofunde-link`: min-height 40px, border-radius 999px, color `#0b6f4d`, font-weight 800, bg rgba(13,148,102,.08)
- `.aprofunde-link.is-empty`: opacity 0.5, cursor default

### Pratique

```html
<div class="step-section">
  <div class="step-section-header">
    <div class="section-icon">🎯</div>
    <h2>Pratique</h2>
  </div>
  <div class="step-section-content">
    <div class="pratique-experimento">
      <strong class="pratique-label">Praticar</strong>
      <p>{experimento}</p>
    </div>
    <div class="pratique-pergunta">
      <strong>Pergunta da semana</strong>
      <p>{pergunta}</p>
    </div>
  </div>
</div>
```

- `.pratique-experimento`: font-size 1.05rem, padding `var(--space-md)`, bg `var(--color-surface)`, border-radius `var(--radius-md)`, border 1px `var(--color-border)`, margin-bottom `var(--space-md)`
- `.pratique-label`: uppercase, letter-spacing 0.03em, font-weight 600, color `var(--color-muted)`
- `.pratique-pergunta`: padding `var(--space-md)`, border-radius `var(--radius-md)`, bg gradient accent-soft, border 1px `var(--accent-soft)`
- `.pratique-pergunta strong`: uppercase, color `var(--accent-text)`, letter-spacing 0.03em

### Organize-se

```html
<div class="step-section">
  <div class="step-section-header">
    <div class="section-icon">📋</div>
    <h2>Organize-se</h2>
  </div>
  <div class="step-section-content">
    <div class="week-plan-grid">
      <div class="week-day-card">
        <strong>Segunda-feira</strong>
        <span class="day-empty">Em breve</span>
        <!-- ou: <span>{tema}</span> + <span class="day-leitura">{leitura}</span> -->
      </div>
      <!-- × 7 dias (Seg a Dom) -->
    </div>
  </div>
</div>
```

- `.week-plan-grid`: grid 2 colunas, gap 14px. Responsivo (≤768px): 1 coluna
- `.week-day-card`: padding 16px, border-radius 20px, bg linear-gradient(180deg, #fff, #fbfcfa), border 1px rgba(13,148,102,.08)
- `.week-day-card strong`: color `#0b6f4d`, font-weight 700, font-size 14px
- `.day-empty`: color `var(--color-muted)`, font-style italic
- `.day-leitura`: font-size 0.8rem, font-style italic, margin-top 6px

## Checklist de replicação

Para cada passo em `dados/passos.json`:

- [ ] `para_comecar.resumo` — texto acolhedor (só a abertura, NÃO o devocional inteiro)
- [ ] `para_comecar.apostila_pdf` — "/apostilas/passo-{id}.pdf" (até o PDF existir, deixar `""` → botão "Em breve")
- [ ] `ouca.titulo` — título do áudio
- [ ] `ouca.spotify_url` — URL embed Spotify ou ""
- [ ] `aprofunde.livro` — { titulo, autor, url } ou {}
- [ ] `aprofunde.musica` — { titulo, artista, url } ou {}
- [ ] `pratique.experimento` — ação concreta, tom acolhedor, sem meta (A+B combinado)
- [ ] `pratique.pergunta` — pergunta para levar no bolso, sem resposta definitiva
- [ ] `organizese.dias` — array 7 objetos { dia, tema, leitura } ou vazio

**Chave de topo (fora de cada passo):**

- [ ] `ferramentas` — array compartilhado de apps/ferramentas (vazio → seção mostra "Em breve")

Após preencher JSON:

- [ ] Rodar `node scripts/gerar-passos.js`
- [ ] Verificar ordem: Para Começar → Ferramentas → Ouça → Aprofunde → Pratique → Organize-se
- [ ] Verificar fallbacks ("Em breve" para campos vazios)
- [ ] Abrir página no navegador e conferir layout visual

## Nomenclatura

Evitar o termo "Facilitador" em textos visíveis ao usuário, pois quem discipula também é discípulo.

| Onde | Como estava | Como fica |
|------|-------------|-----------|
| Página do mapa | "Guia do Facilitador" | "Mapa" |
| Seção de abertura | "O Papel do Facilitador" | "Seu Papel" |
| Seção de checklist | "Checklist do Facilitador" | "Checklist" |
| Nav (desktop) | "Guia do Facilitador" | "Mapa" |
| Nav (mobile) | "Facilitador" | "Mapa" |
| Breadcrumb | "Guia do Facilitador" | "Mapa" |
| `<title>` | "Guia do Facilitador · Praticando o Caminho" | "Mapa da Jornada · Praticando o Caminho" |

A meta description (SEO) pode informar "Mapa da jornada de discipulado" ou manter texto genérico.

## Histórico

| Data | Versão | Mudança |
|------|--------|---------|
| 2026-07-30 | v1.0 | Definição inicial do formato novo |
