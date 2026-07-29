# Regras de Salvamento (Git)

## REGRA DE OURO — Identidade Vitral

Antes de criar ou revisar qualquer conteúdo para este projeto, consulte `docs/REGRA_DE_OURO.md` e valide o texto contra todos os critérios.

Resumo: **Simples, Missional e Acolhedor; Reformado, Protestante e Presbiteriano; com citações bíblicas na NVT; claro, fluido, alinhado e focado no discipulado — com linguagem acessível, sem jargões, e sempre coerente com o Playbook.**

## Comportamento ao salvar

### 1. Comando "salvar" (genérico)
- Branch: `homologacao` (criar se não existir)
- Tag: gerada automaticamente com base no contexto da conversa (ex: `v1.0.0-feature-x`, `fix-y`, `refactor-z`)
- Commit: `git add . && git commit -m "mensagem descritiva"`
- Push: `git push origin homologacao --tags`

### 2. Comando "salvar em main"
- Branch: `main`
- Tag: gerada automaticamente com base no contexto, ou usar a tag informada pelo usuário
- Commit: `git add . && git commit -m "mensagem descritiva"`
- Push: `git push origin main --tags`

### 3. Tag automática
Se o usuário não informar uma tag, gerar baseado no contexto:
- Nova funcionalidade → `v1.x.x-<feature-name>`
- Correção de bug → `fix-<descricao-curta>`
- Refatoração → `refactor-<descricao-curta>`
- Config/infra → `chore-<descricao-curta>`
- Documentação → `docs-<descricao-curta>`

### 4. Fluxo padrão
```bash
git add .
git commit -m "<tipo>: <descrição>"
git tag <tag-name>
git push origin <branch> --tags
```
