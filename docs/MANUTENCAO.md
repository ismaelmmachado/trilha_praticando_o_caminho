# Contrato de Manutenção de Conteúdo — Trilha Praticando o Caminho

Este documento define **como** o conteúdo dos passos é mantido. Todo OpenCode que
atuar neste projeto deve segui-lo sempre que houver mudança de conteúdo.

## 1. Fonte da verdade

- **O conteúdo vive em `dados/passos.json`** — nunca em outro lugar.
- **As páginas `passo-*.html` são GERADAS** por `node scripts/gerar-passos.js`.
- **Nunca edite `passo-*.html` à mão.** Qualquer edição manual é perdida na
  próxima geração.

### Fluxo padrão de manutenção

1. Editar o JSON (`dados/passos.json`).
2. Rodar o gerador: `node scripts/gerar-passos.js`.
3. Verificar que nenhuma página de passo mudou além do esperado (`git diff`).
4. Salvar conforme a regra do `AGENTS.md` (branch `homologacao`, tag contextual).

## 2. Mapeamento seção → campo no JSON

Ordem de renderização do formato atual (todos os 17 passos):

| Seção (HTML) | Ícone | Campo no JSON | Estrutura | Vazio = |
|---|---|---|---|---|
| Para Começar | 📖 | `para_comecar` | `{ resumo, apostila_pdf }` | — |
| Ferramentas para o Caminho | 🛠️ | `ferramentas` (topo, **compartilhado**) | `[{ icon, nome, descricao, link, rotulo }]` | "Em breve" |
| Ouça | 🎧 | `ouca` | `{ titulo, spotify_url }` | "Em breve" |
| Aprofunde | 📚 | `aprofunde` | `{ livro: {titulo, autor, url}, musica: {titulo, artista, url} }` | "Em breve" |
| Pratique | 🎯 | `pratique` | `{ experimento, pergunta, desafio, instrucoes }` | — |
| Organize-se | 📋 | `organizese` | `{ dias: [{dia, tema, leitura}], desafio_semana }` | dias vazios → "Em breve" |

### Regras de mapeamento

- **`ferramentas`** é uma **lista de itens** no topo do arquivo (chave
  compartilhada). Edições afetam **todos os passos**. Cada item:
  `{ icon, nome, descricao, link, rotulo }`.
- **`ouca`** publica o player quando `spotify_url` está preenchido (embed do
  Spotify). Vazio → placeholder "Em breve".
- **`aprofunde`** usa pares `livro` / `musica`, cada um com `url` (vazio → botão
  "Em breve").
- **`pratique`**: o formato atual renderiza `experimento` (bloco "Praticar") e
  `pergunta` (bloco "Pergunta da semana"). `desafio` e `instrucoes` são campos
  legados — não mexer sem orientação.
- **`organizese`**: 7 dias (Segunda a Domingo); cada dia tem `tema` e `leitura`.

### Seção global: Ferramentas

A seção **Ferramentas para o Caminho** é **global**: o mesmo array `ferramentas`
do topo do JSON é renderizado em todos os passos. Por isso:

- **Não faz parte dos espelhos por passo** (Formato 1 abaixo).
- Qualquer ação sobre `ferramentas` aplica no array compartilhado e aparece nos
  17 passos.
- Para manter a regra "pessoa pode entrar em qualquer passo", as ferramentas
  devem permanecer iguais em todos os passos.

## 3. Formatos de solicitação

Aceitam-se DOIS formatos. O usuário envia um deles e diz algo como:
"Aplique no contrato deste projeto: [markdown/instrução]".

### Formato 1 — Arquivo Markdown completo por passo (canônico)

Espelho do passo inteiro. O OpenCode compara com o JSON atual e aplica **somente
as seções que mudaram**. Convenções:

- Cabeçalho: `PASSO: N — NOME` (id e título exatos do JSON).
- Seções com emoji (mesmos da página): `## 📖 Para Começar`, `## 🎧 Ouça`,
  `## 📚 Aprofunde`, `## 🎯 Pratique`, `## 📋 Organize-se`.
- **`Pergunta da semana:`** → `pratique.pergunta`.
- **`Dia: Segunda-feira — tema — leitura`** → objeto correspondente em
  `organizese.dias`.
- Ferramentas **não** entram no espelho (seção global).

#### Exemplo real — Passo 1

```markdown
# PASSO: 1 — O Convite Para Ser Aprendiz

Subtítulo: O começo da jornada com Jesus
Etapa: 1 · Semana: 1

## 📖 Para Começar
Bem-vindo ao primeiro passo da Trilha Praticando o Caminho. Você está aqui
porque, de alguma forma, sente que a fé pode ser mais do que você tem vivido.
Este encontro é sobre um convite — não para mais uma atividade religiosa, mas
para aprender com Jesus, como os primeiros seguidores dele aprenderam.

Apostila PDF: Em breve

## 🎧 Ouça
Título: O Convite Para Ser Aprendiz
Player: Em breve

## 📚 Aprofunde
Livro: Praticando o Caminho — John Mark Comer (Em breve)
Música: Em breve

## 🎯 Pratique
Praticar: Se você puder fazer uma coisa esta semana, que tal começar o dia com
esta frase: "Jesus, estou aqui. Me ensina a caminhar." Só isso. Sem meta, sem
certo ou errado.

Pergunta da semana: Eu sou cristão ou aprendiz? — Leve esta pergunta com você.
Não precisa de resposta agora. Só de honestidade.

## 📋 Organize-se
Dia: Segunda-feira — Em breve
Dia: Terça-feira — Em breve
Dia: Quarta-feira — Em breve
Dia: Quinta-feira — Em breve
Dia: Sexta-feira — Em breve
Dia: Sábado — Em breve
Dia: Domingo — Em breve
```

> O OpenCode interpreta o markdown e preenche o JSON correspondente. Seções
> ausentes no markdown **não** são alteradas.

### Formato 2 — Instrução em linha (atalho)

Para mudanças pontuais:

```
PASSO N — Seção: ## Nome — Ação: INCLUIR/SUBSTITUIR/REMOVER — Conteúdo: [...]
```

Exemplos:

```
PASSO 1 — Seção: ## Ouça — Ação: SUBSTITUIR — Conteúdo: Player: https://open.spotify.com/embed/...
PASSO 3 — Seção: ## Organize-se — Ação: INCLUIR — Conteúdo: Dia: Segunda-feira — Orar e agradecer pelo dia.
PASSO 5 — Seção: ## Aprofunde — Ação: REMOVER — Conteúdo: Música
```

Para `ferramentas` (global), a instrução usa a seção Ferramentas sem número de
passo:

```
Seção: ## Ferramentas — Ação: INCLUIR — Conteúdo: 📖 Nome — Descrição — Link — Rótulo
```

### Regra de prioridade

Se os dois formatos aparecerem juntos, **o arquivo completo (Formato 1) tem
prioridade**.

## 4. Ações

| Ação | Efeito no JSON | Quando usar |
|---|---|---|
| **INCLUIR** | Adiciona ao fim da lista/seção (ex.: novo item, novo dia, preenche campo vazio) | Conteúdo novo |
| **SUBSTITUIR** | Troca **todo** o conteúdo da seção pelo novo | Conteúdo desatualizado/errado |
| **REMOVER** | **Esvazia** o campo da seção → renderiza placeholder "Em breve" | Conteúdo sai temporariamente |

> **REMOVER neste projeto NÃO remove a seção do HTML.** A regra do layout é
> "nunca remover seção nem quebrar layout" — seção esvaziada continua aparecendo
> com "Em breve". Para remover a seção de fato, seria necessária orientação
> explícita e mudança no gerador.

## 5. Fluxo de execução

1. Ler `dados/passos.json` **sempre do estado atual** (nunca de memória).
2. Comparar com a solicitação (Formato 1 ou 2).
3. Aplicar **somente** as seções indicadas.
4. Rodar `node scripts/gerar-passos.js`.
5. Verificar: nenhuma página deve mudar além das seções alteradas
   (`git diff` nas `passo-*.html`).
6. Reportar por passo: **INCLUÍDO / SUBSTITUÍDO / REMOVIDO** (ou "já aplicado").

## 6. Regras de segurança

- **Não duplicar:** se o conteúdo já existe, reportar "já aplicado" e não
  duplicar.
- **Seção inexistente:** criar logo após a seção anterior no modelo de dados.
- **Preservar emojis, negritos, links e formatação** ao migrar texto.
- **Não inventar conteúdo:** se uma seção está vazia, mantém-se vazia
  (placeholder "Em breve") — nunca preencher com texto fictício.
- **Regra de Ouro / Playbook:** ao redigir ou revisar texto, consultar
  `docs/REGRA_DE_OURO.md` (linguagem simples, missional e acolhedora; citações
  bíblicas na NVT).
- **Nunca editar `passo-*.html` à mão.**
- Se o `ferramentas` for alterado, avisar que afeta os 17 passos.
