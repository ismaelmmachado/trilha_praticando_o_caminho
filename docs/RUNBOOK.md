# Runbook — Atualização Geral do Projeto

Guia passo a passo para executar **qualquer tipo de atualização** no site, com
comandos reais e checklists de verificação. Siga o cenário correspondente.

> Referências: conteúdo de passo → `docs/MANUTENCAO.md` · decisões → `docs/DECISOES.md`
> · identidade/texto → `docs/REGRA_DE_OURO.md` · padrão de seções → `docs/padrao-secoes-passo.md`

## Comandos-base

| Ação | Comando |
|---|---|
| Gerar páginas de passo | `node scripts/gerar-passos.js` |
| Checar sintaxe do gerador | `node --check scripts/gerar-passos.js` |
| Validar JSON | `node -e "JSON.parse(require('fs').readFileSync('dados/passos.json','utf-8'))"` |
| Servir local | `python3 -m http.server 8080` → http://localhost:8080 |
| Ver o que mudou | `git diff` / `git status --short` |
| Regenerar tabela do README | `node scripts/gerar-readme.js` |

## Checklist de verificação (vale para todos os cenários)

1. `node --check scripts/gerar-passos.js` — OK.
2. Rodar o gerador — "Todas as 17 páginas foram geradas com sucesso!".
3. `git diff` nas `passo-*.html` — **somente** as seções/páginas esperadas mudaram.
4. Campos vazios continuam com "Em breve" (`.is-empty`) e o layout não quebrou.
5. Abrir a(s) página(s) afetada(s) no navegador e conferir visual.
6. Docs afetados atualizados no mesmo commit (regra "docs vivos" — `AGENTS.md`).

---

## Cenário 1 — Atualizar conteúdo de um passo

1. Editar o campo correspondente em `dados/passos.json` seguindo `docs/MANUTENCAO.md`
   (mapeamento seção → campo; ações INCLUIR/SUBSTITUIR/REMOVER).
2. Rodar `node scripts/gerar-passos.js`.
3. Conferir que **apenas** o `passo-N.html` esperado mudou (`git diff passo-N.html`).
4. Relatar por passo: INCLUÍDO / SUBSTITUÍDO / REMOVIDO.

## Cenário 2 — Atualizar conteúdo global

| O quê | Onde vive | Como atualizar |
|---|---|---|
| Ferramentas (todas as páginas) | `ferramentas` (topo do JSON) | Editar o array → rodar gerador |
| Transição Etapa 1→2 (home) | `js/app.js` (constante `TRANSICAO_HTML`) | Editar → recarregar a home (arquivo servido direto) |
| Footer / nav (passos) | Template do gerador (`gerar-passos.js`) | Editar template → rodar gerador |
| Footer / nav (index, mapa, complementar, passo) | HTML estático de cada página | Editar cada arquivo |
| Mapa da Jornada | `mapa.html` (estático) | Editar o arquivo |
| Material Complementar | `complementar.html` (estático) | Editar o arquivo |

Após qualquer edição global: rodar gerador (se template/JSON) + checklist de verificação.

## Cenário 3 — Adicionar um novo passo (ex.: Passo 18)

1. Adicionar o objeto do passo em `dados/passos.json`:
   - Em `passos`: novo objeto com `id`, `titulo`, `subtitulo`, `etapa`, `status`,
     `semana` e as seções (`para_comecar`, `ouca`, `aprofunde`, `pratique`, `organizese`).
   - Em `etapas`, adicionar o `id` ao array `passos` da etapa correta.
2. Rodar o gerador → cria `passo-18.html`.
3. Atualizar `mapa.html` (tabela "Referência do Livro por Passo" é manual).
4. Rodar `node scripts/gerar-readme.js` → atualiza a tabela do README.
5. Rodar o checklist de verificação.
6. Revisar `docs/PENDENCIAS.md` se o novo passo tem campos vazios.

## Cenário 4 — Mudanças visuais (CSS / tokens)

1. Editar `css/tokens.css` (variáveis) ou `css/estilo.css` (componentes) conforme
   o Design System (`design-system/praticando-o-caminho-vitral/MASTER.md`).
2. **Cache-busting:** hoje **não existe** convenção `?v=` nas folhas de estilo. Se
   a mudança exigir invalidação de cache no GitHub Pages, introduza `?v=<n>` de
   forma consistente **em todas as páginas e no template do gerador** (documente a
   nova convenção em `docs/DECISOES.md`).
3. Conferir a home (neutra), páginas de passo (Etapa 1 amarela / Etapa 2 verde) e
   mapa/complementar.
4. Checklist de verificação.

## Cenário 5 — Deploy (publicação)

O site é hospedado via **GitHub Pages** (branch `main`, raiz).

1. Salvar em `homologacao` (regra `AGENTS.md`): commit + tag + push.
2. Para publicar, **apenas quando o usuário pedir "salvar em main"**: fast-forward
   de `main` a partir de `homologacao`, push e retorno à `homologacao`.
   ```bash
   git checkout main && git merge homologacao && git tag <tag> && git push origin main --tags
   git checkout homologacao
   ```
3. Aguardar o Pages publicar (minutos) e conferir o endereço do README.

---

## Fluxo rápido (conteúdo de passo, o caso mais comum)

```bash
# 1. editar dados/passos.json (seguir docs/MANUTENCAO.md)
# 2. gerar
node scripts/gerar-passos.js
# 3. verificar
git diff passo-N.html
# 4. salvar (regra AGENTS.md)
git add . && git commit -m "..." && git tag docs-... && git push origin homologacao --tags
```
