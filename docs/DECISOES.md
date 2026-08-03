# Decisões de Arquitetura e Conteúdo

Registro leve de decisões (ADR) já tomadas neste projeto. O objetivo é preservar o
**porquê** de cada escolha, para que mudanças futuras não quebrem intenções.

Formato: **Contexto · Alternativas · Decisão · Consequência**

---

## 1. JSON é a fonte da verdade; HTML é gerado

- **Contexto:** o site tinha páginas `passo-*.html` com conteúdo duplicado e sujeito a divergência.
- **Alternativas:** manter HTML manual; usar CMS; gerar a partir de JSON.
- **Decisão:** todo o conteúdo dos passos vive em `dados/passos.json`; `passo-*.html` são geradas por `scripts/gerar-passos.js` e **nunca** editadas à mão.
- **Consequência:** atualização = editar JSON → rodar gerador → verificar. Documentado em `docs/MANUTENCAO.md` e `docs/RUNBOOK.md`.

## 2. Detecção de formato novo vs. legado

- **Contexto:** os passos migraram de um formato (Medite/Assista) para outro (Para Começar/Ferramentas/...), sem quebra.
- **Alternativas:** flag explícita; migração total única.
- **Decisão:** a presença de `passo.para_comecar` define o formato. Formato novo usa os renderizadores novos; ausência cai para o legado (Medite + Assista). `medite` e `assista` permanecem no JSON (fonte das apostilas), mas **não são renderizados** no formato novo.
- **Consequência:** os 17 passos atuais estão no formato novo; o código legado continua suportado mas ocioso.

## 3. Ferramentas compartilhadas (chave de topo)

- **Contexto:** a seção "Ferramentas para o Caminho" exibia as mesmas 3 ferramentas em todos os passos (Bible App, Lectio 365, Vitral no Spotify), hardcoded no gerador.
- **Alternativas:** array por passo (duplicado 17×); array compartilhado no topo.
- **Decisão:** `ferramentas` é array compartilhado no topo do JSON. A pessoa pode entrar em qualquer passo e sempre encontra as ferramentas.
- **Consequência:** edição afeta os 17 passos de uma vez. Não é possível personalizar ferramentas por passo sem nova decisão.

## 4. REMOVER = esvaziar campo (nunca remover a seção)

- **Contexto:** regra do layout: nunca remover seção nem quebrar layout; seção vazia renderiza "Em breve".
- **Alternativas:** ação REMOVER elimina a seção do HTML.
- **Decisão:** no contrato de manutenção, REMOVER **esvazia o campo** → renderiza o placeholder "Em breve". Remover a seção de fato exigiria orientação explícita e mudança no gerador.
- **Consequência:** o layout permanece estável em todas as atualizações de conteúdo.

## 5. Citações bíblicas na NVT

- **Contexto:** identidade Vitral define o padrão linguístico e bíblico.
- **Alternativas:** traduções diferentes; sem padrão.
- **Decisão:** toda citação bíblica usa a Nova Versão Transformativa (NVT). Padrão completo em `docs/REGRA_DE_OURO.md`.
- **Consequência:** textos criados/revisados passam pela REGRA DE OURO antes de ir ao JSON.

## 6. Rename "Facilitador" → "Mapa"

- **Contexto:** o termo "Facilitador" aparecia em textos visíveis ao usuário, mas quem discipula também é discípulo.
- **Alternativas:** manter nomenclatura.
- **Decisão:** nomenclatura visível usa "Mapa" / "Mapa da Jornada"; o termo "Facilitador" não aparece em textos para o usuário.
- **Consequência:** mapeamento de nomenclatura documentado em `docs/padrao-secoes-passo.md`.

## 7. `index.html` neutro (sem `data-etapa`)

- **Contexto:** a home não pertence a uma etapa específica; a cor varia entre Etapa 1 (amarela) e Etapa 2 (verde).
- **Alternativas:** definir uma etapa fixa no index.
- **Decisão:** `index.html` não carrega `data-etapa`; o CSS usa o fallback `:root` (neutro). As páginas de passo carregam `data-etapa="1"` ou `"2"`.
- **Consequência:** a home mantém visual neutro; cada página de passo aplica a cor da sua etapa.

## 8. Placeholders uniformes e acessíveis

- **Contexto:** links de PDF vazios geravam 404; placeholders variavam e usavam inline styles.
- **Decisão:** campos vazios renderizam "Em breve" com a classe global `.is-empty` (sem inline styles); ícones com `aria-hidden`; `aria-current` na nav; fallback `noscript` no `passo.html`.
- **Consequência:** acessibilidade consistente e nenhum link quebrado para conteúdo pendente.
