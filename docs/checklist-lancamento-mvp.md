# Checklist de Lançamento — MVP (Praticando o Caminho)

> Status do projeto na versão MVP. Tudo o que está listado como pendente **aguarda material ou decisão** — nenhum conteúdo foi inventado.

## ✅ Pronto para o MVP

- [x] Página inicial (`index.html`) — hero, 2 etapas, grid de passos, transição Etapa 1→2
- [x] 17 páginas de passo (`passo-1.html` … `passo-17.html`) — 6 seções fixas
- [x] Mapa da Jornada (`mapa.html`) — perguntas, dicas, roteiros e checklist por encontro
- [x] Material Complementar (`complementar.html`) — ferramentas (Bible App, Lectio 365, Podcast Vitral)
- [x] Textos preenchidos nos 17 passos: `resumo`, `devocional`, `base_biblica`, `experimento`, `pergunta`, `instrucoes`
- [x] Placeholders "Em breve" uniformes (sem links quebrados / 404)
- [x] Acessibilidade: skip-link, `aria-label`, `aria-hidden`, `aria-current="page"`, `:focus-visible`, footer frase-guia em todas as páginas
- [x] Servir localmente: `python3 -m http.server 8080` (todas as páginas retornam 200)

## ⏳ Pendente — conteúdo multimídia (aguarda material)

Todo conteúdo abaixo está com placeholder "Em breve" no site. Preencher em `dados/passos.json` e rodar `node scripts/gerar-passos.js`.

| Campo | Onde | Status |
|-------|------|--------|
| Vídeos | `assista.url` | Vazio nos 17 passos. ⚠️ Campo não renderizado no formato atual (seção `assista` só existe no formato antigo). |
| Áudios Spotify | `ouca.spotify_url` | Vazio nos 17 passos. |
| Músicas sugeridas | `aprofunde.musica.{titulo,artista,url}` | Vazio nos 17 passos. |
| Links de livros | `aprofunde.livro.url` | Vazio nos 17 passos (título/autor preenchidos: "Praticando o Caminho", John Mark Comer). |
| Grade semanal | `organizese.dias[].{tema,leitura}` | 119 dias vazios (7 × 17). |
| Desafio | `pratique.desafio` | Vazio nos 17 passos (experimento/pergunta/instruções preenchidos). |
| PDFs das apostilas | `/apostilas/passo-N.pdf` | Não existem. Botão exibe "Em breve" (`apostila_pdf = ""`). Fonte: apostilas em Markdown em `apostilas/*.md`. |

## ⚠️ Pendente — decisão de conteúdo

Itens que vieram das apostilas-fonte, mas merecem revisão humana antes do lançamento:

- **Passo 7 afirma ser o "passo final da Etapa 1"** (`resumo` e `devocional`). A apostila 7 e a apostila 8 ambas se dizem "último/última da Etapa 1" — a Etapa 1 vai até o passo 8. Decidir: corrigir o texto (alinhar à estrutura 1–8) ou manter fiel à fonte.
- **Citações bíblicas fora da NVT** (Regra de Ouro pede NVT). Algumas citações de `base_biblica` usam tradução Almeida/NVI (ex.: Salmo 46.10 "Aquietai-vos", Atos 20.35 "bem-aventurado", Isaías 58.6, Salmo 37.7, Josué 1.8, Romanos 9.21). Há também versículos duplicados com texto divergente: **Filipenses 2.13** (passos 2 e 3) e **1 Coríntios 12.12** (passos 8 e 15). Decidir: revisar contra as apostilas-oficiais/Playbook e alinhar à NVT.

## 🔧 Manutenção (repositório)

- Gerar páginas: `node scripts/gerar-passos.js` (sempre após mudar `dados/passos.json` ou o template)
- Extrator de apostilas DOCX: `scripts/extrair_apostilas.py`
- Regras de salvamento (Git): ver `AGENTS.md`
