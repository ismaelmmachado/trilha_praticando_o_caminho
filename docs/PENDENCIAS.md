# Pendências de Conteúdo

Fonte única da lista de conteúdo que ainda está "Em breve" no site. Atualizar este
arquivo sempre que um item for resolvido (preencher o campo no JSON e marcar aqui).

> Modelo de manutenção de conteúdo: `docs/MANUTENCAO.md`

## Legenda

- ⏳ aguardando material
- ✅ resolvido

## Pendências (conteúdo multimídia)

Todo conteúdo multimídia está como "Em breve" — aguardando material externo.

| # | Item | Campo no JSON | Onde aparece | Status |
|---|------|---------------|--------------|--------|
| 1 | Vídeos dos passos | `assista.url` | Não renderizado no formato atual (`assista` só aparece no formato antigo) | ⏳ |
| 2 | Áudios Spotify | `ouca.spotify_url` | Seção "Ouça" (player embutido) | ⏳ |
| 3 | Músicas sugeridas | `aprofunde.musica` | Seção "Aprofunde" | ⏳ |
| 4 | Grade semanal | `organizese.dias[].tema` e `leitura` | Seção "Organize-se" | ⏳ |
| 5 | Links de livros | `aprofunde.livro.url` | Seção "Aprofunde" (botão Acessar) | ⏳ |
| 6 | Desafio do Pratique | `pratique.desafio` | Vazio nos 17 passos (experimento/pergunta/instruções preenchidos) | ⏳ |
| 7 | PDFs das apostilas | `para_comecar.apostila_pdf` | Botão "Baixar Apostila em PDF" exibe "Em breve" até o PDF existir | ⏳ |

## Como resolver um item

1. Preencher o campo correspondente em `dados/passos.json` (seguir `docs/MANUTENCAO.md`).
2. Rodar `node scripts/gerar-passos.js`.
3. Conferir o diff (`git diff` nas `passo-*.html` — só o esperado).
4. Marcar como ✅ neste arquivo.
