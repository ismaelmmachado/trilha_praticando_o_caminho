# Regras de Salvamento (Git)

## REGRA DE OURO — Identidade Vitral

Antes de criar ou revisar qualquer conteúdo para este projeto, consulte `docs/REGRA_DE_OURO.md` e valide o texto contra todos os critérios.

Resumo: **Simples, Missional e Acolhedor; Reformado, Protestante e Presbiteriano; com citações bíblicas na NVT; claro, fluido, alinhado e focado no discipulado — com linguagem acessível, sem jargões, e sempre coerente com o Playbook.**

## Comportamento ao salvar

### 1. Comando "salvar" (genérico)
**Sempre o padrão.** Salvar somente em `main` quando o usuário orientar explicitamente.
- Branch: `homologacao` (criar se não existir)
- Tag: gerada automaticamente com base no contexto da conversa (ex: `v1.0.0-feature-x`, `fix-y`, `refactor-z`)
- Commit: `git add . && git commit -m "mensagem descritiva"`
- Push: `git push origin homologacao --tags`

### 2. Comando "salvar em main"
Somente quando o usuário pedir explicitamente ("salvar em main").
- Branch: `main`
- Tag: gerada automaticamente com base no contexto, ou usar a tag informada pelo usuário
- Commit: `git add . && git commit -m "mensagem descritiva"`
- Push: `git push origin main --tags`

### 3. Retorno à homologação
Após concluir QUALQUER processo de salvamento (homologacao ou main), retornar à branch `homologacao` (`git checkout homologacao`).

### 4. Tag automática
Se o usuário não informar uma tag, gerar baseado no contexto:
- Nova funcionalidade → `v1.x.x-<feature-name>`
- Correção de bug → `fix-<descricao-curta>`
- Refatoração → `refactor-<descricao-curta>`
- Config/infra → `chore-<descricao-curta>`
- Documentação → `docs-<descricao-curta>`

### 5. Fluxo padrão
```bash
git add .
git commit -m "<tipo>: <descrição>"
git tag <tag-name>
git push origin <branch> --tags
```

## Work State

### Tags no repositório
- `refactor-ajustes-estruturais` — correção de cor Etapa 2, renomeio facilitador→mapa, inline styles removidos
- `fix-hero-label` — hero-label "ESTAÇÃO 2 — PRATICANDO O CAMINHO"
- `fix-ux-ui-ajustes` — PDF links → "Em breve", indicador progresso, aria-hidden, noscript, back-to-top, tokens, inline style app.js
- `chore-limpeza-css` — variáveis não usadas removidas, back-to-top href corrigido, data-etapa removido
- `fix-pdf-links-em-breve` — botão PDF → "Em breve" (sem 404), placeholders sem inline styles
- `docs-regra-salvamento-homologacao` — regra: sempre homologacao, main só sob orientação, retorno à homologacao
- `v1.0.0-mvp-lancamento` — preparação do MVP: hero corrigido, footer frase-guia, aria-current, foco visível, limpeza CSS, passo.html validado, README e checklist de lançamento
- `chore-remocao-skills-locais` — skills e commands locais removidos (migrados para `~/.opencode` global), README ajustado
- `feat-favicon` — `favicon.svg` adicionado a todas as páginas e ao template do gerador

### Pendências (conteúdo)
Todo conteúdo multimídia está como "Em breve" — aguardando material:
- Vídeos (assista.url em `dados/passos.json`; campo não renderizado no formato atual — `assista` só aparece no formato antigo)
- Áudios Spotify (ouca.spotify_url)
- Músicas sugeridas (aprofunde.musica)
- Grade semanal (organizese.dias)
- Links de livros (aprofunde.livro.url)
- `pratique.desafio` (vazio nos 17 passos; experimento/pergunta/instruções preenchidos)
- PDFs das apostilas — botão exibe "Em breve" (apostila_pdf = "") até os PDFs existirem

### Estrutura
- `index.html` sem `data-etapa` (neutro — :root fallback no CSS)
- Todos os HTMLs com `aria-hidden` em ícones e `back-to-top`; `passo.html` (redirect) com `noscript` fallback
- `css/tokens.css` limpo (9 variáveis órfãs removidas)
- Gerador `scripts/gerar-passos.js` atualizado com todas as mudanças de template
- `favicon.svg` referenciado via `<link rel="icon">` nas páginas estáticas (index, complementar, mapa, passo) e no template do gerador
- Footer padrão em todas as páginas com a frase-guia
