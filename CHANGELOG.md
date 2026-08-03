# Changelog

Histórico de versões por tag (ordem cronológica). Fonte única do ledger de tags
(antes mantido no `AGENTS.md`). Gerado a partir de `git for-each-ref --sort=creatordate`.

## 2026-07-29

- `v1.0.0-minisite-vitral` — minisite Praticando o Caminho Vitral com 17 passos
- `docs-readme-inicial` — README.md com visão geral do projeto
- `chore-github-pages-setup` — `.nojekyll` para GitHub Pages
- `docs-readme-link-site` — link do GitHub Pages no README
- `v2.0.0-conteudo-passos` — conteúdo real dos 17 passos extraído das apostilas Estação 2
- `v2.1.0-transicao-home` — seção de transição entre Etapa 1 e Etapa 2 na home
- `v2.2.0-guia-facilitador` — guia do facilitador com conteúdo completo das apostilas
- `docs-readme-atualizado` — README com conteúdo real dos passos e estrutura do projeto
- `feat-paginas-estaticas-passos` — páginas estáticas individuais (passo-1.html a passo-17.html)
- `feat-apostilas-markdown` / `feat-apostilas-markdown-main` — pasta `apostilas` com conteúdo extraído dos docx em markdown
- `docs-regra-de-ouro` — REGRA_DE_OURO como identidade Vitral para criação de conteúdo
- `refactor-transicao-fluid` — reescrita da transição com texto fluido e humanizado (REGRA DE OURO)
- `refactor-transicao-enxuta` — enxugada da transição para convite direto

## 2026-07-30

- `v1.0.0-melhoria-conteudo-passos` — nova estrutura de conteúdo no Passo 1
- `v1.1.0-ajustes-layout-e-apps` — ajustes de layout no Passo 1 e página principal
- `v1.2.0-ferramentas-e-podcast` — seções de ferramentas e podcast
- `docs-padrao-secoes` — documentação do padrão de seções + ajustes de layout
- `fix-revisao-pratique` — revisão da especificação do Pratique (acordo A+B)
- `docs-contrato-visual` — Layout/Visual Contract e Checklist de replicação
- `v2.0.0-novo-formato-completo` — novo formato replicado para os passos 2-17
- `fix-nomenclatura-guia` — remoção de "Facilitador" do texto visível
- `refactor-revisao-ui-ux` — revisão UI/UX: CSS sem duplicatas nem cores hardcoded, inline styles extraídos, nav unificada, apostilas ESTACAO→ETAPA, MASTER.md atualizado
- `refactor-ajustes-estruturais` — correção de cor Etapa 2, renomeio facilitador→mapa, inline styles removidos
- `fix-hero-label` — hero-label "ESTAÇÃO 2 — PRATICANDO O CAMINHO"
- `fix-ux-ui-ajustes` — PDF links → "Em breve", indicador de progresso, aria-hidden, fallback noscript, back-to-top, tokens CSS, inline style removido
- `chore-limpeza-css` — variáveis CSS não usadas removidas, back-to-top corrigido, data-etapa removido
- `docs-work-state` — Work State adicionado ao AGENTS.md

## 2026-07-31

- `fix-pdf-links-em-breve` — botão PDF exibe "Em breve" (sem 404) e placeholders multimídia consistentes sem inline styles
- `docs-regra-salvamento-homologacao` — regra de salvamento: sempre homologacao, main só sob orientação, retorno à homologacao
- `v1.0.0-mvp-lancamento` — preparação do MVP: hero corrigido, footer frase-guia, aria-current, foco visível, limpeza de CSS, passo.html validado, README e checklist de lançamento
- `docs-alinhamento-documentacao` — blueprint com modelo de dados real e tokens, AGENTS tags novas, migrar-passos.js documentado, padrao-secoes e MASTER consistentes

## 2026-08-02

- `chore-remocao-skills-locais` — skills e commands locais removidos (migrados para `~/.opencode` global)
- `feat-favicon` — `favicon.svg` adicionado a todas as páginas e ao template do gerador
- `docs-atualizacao-favicon` — documentação atualizada: favicon, tags e estrutura

## 2026-08-03

- `refactor-ferramentas-data-driven` — seção "Ferramentas para o Caminho" 100% data-driven (array compartilhado `ferramentas` no topo do JSON, gerador sem conteúdo fixo)
- `docs-modelo-conteudo-data-driven` — Work State com modelo de conteúdo data-driven
- `docs-contrato-manutencao` — contrato de manutenção de conteúdo (`docs/MANUTENCAO.md`) registrado no AGENTS.md
- `docs-manutencao-main` — sincronização do contrato na branch `main`
