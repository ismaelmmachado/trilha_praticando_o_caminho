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
    <p>Você concluiu a Etapa 1 da Trilha Praticando o Caminho. Foram oito passos — e você os percorreu. Agora você está prestes a iniciar a Etapa 2: o aprofundamento em cada uma das 9 práticas que nos formam.</p>

    <p>Você começou entendendo o que significa ser aprendiz de Jesus. Depois descobriu que está sendo formado o tempo todo — e que a transformação não acontece por esforço isolado, mas pela prática. Conheceu as 9 práticas espirituais, enfrentou a dor com honestidade, trouxe o pecado à luz, criou sua Regra de Vida e entendeu a importância de caminhar com outros.</p>

    <p>Agora é hora de mergulhar. Você vai explorar o descanso como ritmo de graça, a oração como conversa com Deus, o jejum como espaço para Ele, o silêncio como lugar sagrado, a generosidade como estilo de vida, a meditação como leitura orante, a comunidade como corpo de Cristo, o serviço como expressão do Reino e o testemunho como coerência de vida.</p>

    <div class="transicao-conexao">
      <p>A Etapa 1 e a Etapa 2 não são duas jornadas diferentes. São duas partes de uma mesma jornada.</p>
      <blockquote>A Etapa 1 te deu o mapa. A Etapa 2 te ajuda a caminhar.</blockquote>
    </div>

    <p class="transicao-reflexao">A transformação não acontece por conhecimento — acontece por prática. Você está pronto para dar o próximo passo?</p>
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
