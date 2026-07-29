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
    <p>Você concluiu a Etapa 1 da Trilha Praticando o Caminho. Foram oito passos. Agora você está prestes a iniciar a Etapa 2 — o aprofundamento em cada uma das 9 práticas que nos formam.</p>

    <div class="transicao-tabelas">
      <div class="transicao-col">
        <h3>O que você aprendeu (Etapa 1)</h3>
        <ul>
          <li><strong>1.</strong> O Convite para ser Aprendiz — Você entendeu o que significa ser aprendiz de Jesus</li>
          <li><strong>2.</strong> A Formação que Começa em Deus — Você descobriu que está sendo formado o tempo todo</li>
          <li><strong>3.</strong> O Caminho da Transformação — Você aprendeu que a transformação acontece pela prática</li>
          <li><strong>4.</strong> As Práticas que nos Formam — Você conheceu as 9 práticas espirituais</li>
          <li><strong>5.</strong> Dor e Sofrimento — Você aprendeu a trazer a dor à luz</li>
          <li><strong>6.</strong> Cura do Pecado — Você entendeu a importância da confissão e da cura</li>
          <li><strong>7.</strong> Minha Regra de Vida — Você criou um ritmo pessoal para a caminhada</li>
          <li><strong>8.</strong> Vida em Comunidade — Você entendeu a importância de caminhar com outros</li>
        </ul>
      </div>

      <div class="transicao-col">
        <h3>O que vem a seguir (Etapa 2)</h3>
        <ul>
          <li><strong>9.</strong> O Descanso como Ritmo de Graça — Você vai aprofundar a prática do descanso semanal</li>
          <li><strong>10.</strong> O Ritmo da Oração — Você vai cultivar um ritmo de oração que sustenta a vida</li>
          <li><strong>11.</strong> O Jejum como Espaço para Deus — Você vai descobrir o jejum como prática de dependência</li>
          <li><strong>12.</strong> O Silêncio como Espaço Sagrado — Você vai aprender a criar espaço para ouvir Deus</li>
          <li><strong>13.</strong> A Generosidade como Estilo de Vida — Você vai confrontar a lógica do consumo</li>
          <li><strong>14.</strong> A Meditação como Leitura Orante — Você vai aprender a ler a Bíblia de forma lenta e orante</li>
          <li><strong>15.</strong> A Comunidade como Corpo de Cristo — Você vai aprofundar seu lugar no corpo de Cristo</li>
          <li><strong>16.</strong> O Serviço como Expressão do Reino — Você vai descobrir o serviço como identidade</li>
          <li><strong>17.</strong> O Testemunho como Coerência de Vida — Você vai aprender a viver de forma que sua vida aponte para Jesus</li>
        </ul>
      </div>
    </div>

    <div class="transicao-conexao">
      <h3>Como as duas etapas se conectam</h3>
      <div class="transicao-grid">
        <div class="transicao-card">
          <span class="tc-label">Etapa 1</span>
          <span>É a fundação</span>
          <span>Ensina o que fazer</span>
          <span>Apresenta as práticas</span>
          <span>Cria a Regra de Vida</span>
          <span>É o "por que"</span>
        </div>
        <div class="transicao-card">
          <span class="tc-label">Etapa 2</span>
          <span>É o aprofundamento</span>
          <span>Ensina como fazer</span>
          <span>Aprofunda cada prática</span>
          <span>Preenche a Regra de Vida com práticas concretas</span>
          <span>É o "como"</span>
        </div>
      </div>
      <blockquote>A Etapa 1 te deu o mapa. A Etapa 2 te ajuda a caminhar.</blockquote>
    </div>
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
