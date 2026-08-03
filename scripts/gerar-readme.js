const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dados = JSON.parse(fs.readFileSync(path.join(root, 'dados', 'passos.json'), 'utf-8'));
const readmePath = path.join(root, 'README.md');
const readme = fs.readFileSync(readmePath, 'utf-8');

const START = '<!-- PASSOS-START -->';
const END = '<!-- PASSOS-END -->';

const linhas = dados.passos.map(p => {
  const status = p.status === 'aberto' ? '✅ Aberto' : '⏳ Em breve';
  return `| ${p.id} | ${p.titulo} | ${p.etapa} | ${status} |`;
});

const bloco = `${START}
| # | Título | Etapa | Status |
|---|--------|-------|--------|
${linhas.join('\n')}
${END}`;

const inicio = readme.indexOf(START);
const fim = readme.indexOf(END);

if (inicio === -1 || fim === -1) {
  console.error('Marcadores PASSOS-START/PASSOS-END não encontrados no README.md');
  process.exit(1);
}

const novo = readme.slice(0, inicio) + bloco + readme.slice(fim + END.length);
fs.writeFileSync(readmePath, novo, 'utf-8');
console.log('README.md atualizado com a tabela de passos gerada de dados/passos.json');
