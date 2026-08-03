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

### Mapa da Documentação

| O que você procura | Onde |
|---|---|
| Identidade / linguagem (REGRA DE OURO, citações NVT) | `docs/REGRA_DE_OURO.md` |
| Como manter conteúdo dos passos (ações INCLUIR/SUBSTITUIR/REMOVER) | `docs/MANUTENCAO.md` |
| Como executar cada tipo de atualização (runbook) | `docs/RUNBOOK.md` |
| Por que as decisões foram tomadas (ADR) | `docs/DECISOES.md` |
| Padrão de seções / layout visual dos passos | `docs/padrao-secoes-passo.md` |
| Modelo de dados e spec da trilha | `docs/blueprint-nova-trilha.md` |
| Pendências de conteúdo ("Em breve") | `docs/PENDENCIAS.md` |
| Histórico de tags/versões | `CHANGELOG.md` |
| Design system / tokens | `design-system/praticando-o-caminho-vitral/MASTER.md` |

### Docs vivos

Mudou código ou conteúdo? Atualize o documento correspondente no **mesmo commit**
(nada de "docs separados depois"). Se um fato precisa aparecer em mais de um lugar,
use **cross-link** — nunca duplique o conteúdo.

### Tags no repositório

Histórico completo em `CHANGELOG.md`. Tags recentes:
- `docs-manutencao-main` — contrato de manutenção sincronizado em `main`
- `docs-contrato-manutencao` — `docs/MANUTENCAO.md` + referência no AGENTS.md
- `docs-modelo-conteudo-data-driven` — Work State com modelo de conteúdo data-driven
- `refactor-ferramentas-data-driven` — seção Ferramentas 100% data-driven

### Modelo de conteúdo (data-driven)
- **TODO o conteúdo dos passos vive em `dados/passos.json`** — `passo-*.html` são geradas e **NÃO devem ser editadas à mão**
- Fluxo de manutenção: editar o JSON → rodar `node scripts/gerar-passos.js` → conferir que nenhuma página de passo muda no diff (visual preservado)
- Campos vazios renderizam placeholder "Em breve" (classe `.is-empty` global) — nunca remover seção nem quebrar layout
- `index.html` carrega o JSON via `fetch` em `js/app.js` (data-driven)
- Seção Ferramentas vem do array compartilhado `ferramentas` (topo do JSON), igual em todos os passos
- Tabela de passos do `README.md` é gerada por `node scripts/gerar-readme.js` (não editar à mão)

### Manutenção de conteúdo dos passos
- Antes de aplicar qualquer mudança de conteúdo, leia `docs/MANUTENCAO.md` e siga exatamente o contrato (fonte da verdade em JSON, HTML gerado, ações INCLUIR/SUBSTITUIR/REMOVER)
- Para executar uma atualização passo a passo, siga `docs/RUNBOOK.md`

### Pendências (conteúdo)

Fonte única: `docs/PENDENCIAS.md`. Resumo: todo conteúdo multimídia aguarda material — vídeos, áudios Spotify, músicas sugeridas, grade semanal, links de livros, `pratique.desafio` e PDFs das apostilas (botões exibem "Em breve").

### Estrutura
- `index.html` sem `data-etapa` (neutro — :root fallback no CSS)
- Todos os HTMLs com `aria-hidden` em ícones e `back-to-top`; `passo.html` (redirect) com `noscript` fallback
- `css/tokens.css` limpo (9 variáveis órfãs removidas)
- Gerador `scripts/gerar-passos.js` atualizado com todas as mudanças de template
- `favicon.svg` referenciado via `<link rel="icon">` nas páginas estáticas (index, complementar, mapa, passo) e no template do gerador
- Footer padrão em todas as páginas com a frase-guia
