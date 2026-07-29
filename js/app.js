function loadJSON(path) {
  return fetch(path).then(r => {
    if (!r.ok) throw new Error('Erro ao carregar dados');
    return r.json();
  });
}

const TRANSICAO_HTML = `
<div class="transicao-section">
  <div class="transicao-header">
    <span class="transicao-badge">Transição</span>
    <h2>Da Etapa 1 para a Etapa 2</h2>
  </div>

  <div class="transicao-body">
    <p>Você concluiu a Etapa 1 da Trilha. Foram oito passos — e você os percorreu. Agora é hora de mergulhar.</p>

    <p>A Etapa 2 não é um novo começo. É onde cada prática que você conheceu ganha profundidade. O que antes foi apresentado agora será vivido com mais intenção.</p>

    <div class="transicao-conexao">
      <blockquote>A Etapa 1 te deu o mapa. A Etapa 2 te ajuda a caminhar.</blockquote>
    </div>

    <p class="transicao-reflexao">O próximo passo te espera.</p>
  </div>
</div>`;

function renderEtapa(etapa, passos, container) {
  const etapaData = passos.filter(p => p.etapa === etapa.id);
  const cor = etapa.cor === 'amarela' ? 'data-etapa="1"' : 'data-etapa="2"';

  let html = `<div class="etapa-group" ${cor}>
    <div class="etapa-header">
      <span class="etapa-badge">Etapa ${etapa.id}</span>
      <h2>${etapa.titulo}</h2>
      <span>${etapaData.length} passos</span>
    </div>
    <div class="steps-grid">`;

  etapaData.forEach(p => {
    const locked = p.status === 'breve';
    html += `
      <a class="step-card${locked ? ' locked' : ''}" href="${locked ? '#' : 'passo-' + p.id + '.html'}">
        <div class="step-card-top">
          <div class="step-number">${p.id}</div>
          <span class="step-status ${p.status}">${p.status === 'aberto' ? 'Disponível' : 'Em breve'}</span>
        </div>
        <h3>${p.titulo}</h3>
        <p>${p.subtitulo}</p>
        <div class="step-card-bottom">
          ${locked ? '<span class="step-week">Em breve</span>' : '<span class="step-link">Acessar passo →</span>'}
          <span class="step-week">Semana ${p.semana}</span>
        </div>
      </a>`;
  });

  html += '</div></div>';
  container.insertAdjacentHTML('beforeend', html);
}

function renderTransicao(container) {
  container.insertAdjacentHTML('beforeend', TRANSICAO_HTML);
}

document.addEventListener('DOMContentLoaded', () => {
  const homeContainer = document.getElementById('etapas-container');
  if (homeContainer) {
    loadJSON('dados/passos.json').then(data => {
      data.etapas.forEach((e, i) => {
        renderEtapa(e, data.passos, homeContainer);
        if (i === 0) renderTransicao(homeContainer);
      });
    }).catch(err => {
      homeContainer.innerHTML = `<p style="color:var(--color-muted);text-align:center;padding:2rem;">${err.message}</p>`;
    });
  }
});
