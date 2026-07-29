const SECOES = {
  medite: { icone: '📖', titulo: 'Medite' },
  assista: { icone: '🎬', titulo: 'Assista' },
  aprofunde: { icone: '📚', titulo: 'Aprofunde' },
  pratique: { icone: '🎯', titulo: 'Pratique' },
  organizese: { icone: '📋', titulo: 'Organize-se' }
};

function getStepId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'), 10) || 1;
}

function getPassoTitulo(passo, passos) {
  const idx = passos.findIndex(p => p.id === passo.id);
  return {
    anterior: idx > 0 ? passos[idx - 1] : null,
    proximo: idx < passos.length - 1 ? passos[idx + 1] : null
  };
}

function renderSecaoMedite(html, passo) {
  html += `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon">${SECOES.medite.icone}</div>
      <h2>${SECOES.medite.titulo}</h2>
    </div>
    <div class="step-section-content">
      <span class="base-biblica">${passo.medite.base_biblica}</span>
      <p>${passo.medite.devocional}</p>
    </div>
  </div>`;
  return html;
}

function renderSecaoAssista(html, passo) {
  const videoHtml = passo.assista.url
    ? `<iframe src="${passo.assista.url}" allowfullscreen></iframe>`
    : '<p>Em breve</p>';
  html += `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon">${SECOES.assista.icone}</div>
      <h2>${SECOES.assista.titulo}: ${passo.assista.titulo}</h2>
    </div>
    <div class="step-section-content">
      <div class="video-placeholder">${videoHtml}</div>
    </div>
  </div>`;
  return html;
}

function renderSecaoAprofunde(html, passo) {
  if (!passo.aprofunde || passo.aprofunde.length === 0) {
    html += `<div class="step-section">
      <div class="step-section-header">
        <div class="section-icon">${SECOES.aprofunde.icone}</div>
        <h2>${SECOES.aprofunde.titulo}</h2>
      </div>
      <div class="step-section-content">
        <p style="color:var(--color-muted)">Materiais complementares em breve.</p>
      </div>
    </div>`;
    return html;
  }
  html += `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon">${SECOES.aprofunde.icone}</div>
      <h2>${SECOES.aprofunde.titulo}</h2>
    </div>
    <div class="step-section-content">
      <div class="resource-list">`;
  passo.aprofunde.forEach(r => {
    html += `<div class="resource-item">
      <div class="resource-info">
        <strong>${r.titulo}</strong>
        <span>${r.autor ? r.autor + ' · ' : ''}${r.tipo}</span>
      </div>
      ${r.url ? `<a class="resource-link" href="${r.url}" target="_blank">Acessar</a>` : '<span class="resource-link" style="opacity:0.5">Em breve</span>'}
    </div>`;
  });
  html += `</div></div></div>`;
  return html;
}

function renderSecaoPratique(html, passo) {
  html += `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon">${SECOES.pratique.icone}</div>
      <h2>${SECOES.pratique.titulo}</h2>
    </div>
    <div class="step-section-content">
      <p><strong>${passo.pratique.desafio}</strong></p>
      <p style="margin-top:var(--space-md);color:var(--color-muted)">${passo.pratique.instrucoes}</p>
    </div>
  </div>`;
  return html;
}

function renderSecaoOrganizese(html, passo) {
  html += `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon">${SECOES.organizese.icone}</div>
      <h2>${SECOES.organizese.titulo}</h2>
    </div>
    <div class="step-section-content">
      <div class="week-plan">`;
  passo.organizese.dias.forEach(d => {
    html += `<div class="week-day">
      <strong>${d.dia}</strong>
      <span class="day-tema">${d.tema}</span>
      <span class="day-leitura">${d.leitura}</span>
    </div>`;
  });
  html += `</div></div></div>`;
  return html;
}

function renderNavegacao(passo, nav) {
  const { anterior, proximo } = nav;
  let html = '<div class="step-nav">';

  if (anterior) {
    html += `<a href="passo.html?id=${anterior.id}" class="step-nav-link">← ${anterior.titulo}</a>`;
  } else {
    html += `<span class="step-nav-link disabled">← Anterior</span>`;
  }

  html += `<a href="index.html" class="step-nav-link">Início</a>`;

  if (proximo) {
    html += `<a href="passo.html?id=${proximo.id}" class="step-nav-link">${proximo.titulo} →</a>`;
  } else {
    html += `<span class="step-nav-link disabled">Próximo →</span>`;
  }

  html += '</div>';
  return html;
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('passo-container');
  if (!container) return;

  const id = getStepId();

  fetch('dados/passos.json')
    .then(r => r.json())
    .then(data => {
      const passo = data.passos.find(p => p.id === id);
      if (!passo) throw new Error('Passo não encontrado');

      const nav = getPassoTitulo(passo, data.passos);

      document.documentElement.setAttribute('data-etapa', passo.etapa);

      document.getElementById('page-title').textContent = passo.titulo + ' · Praticando o Caminho';
      document.getElementById('breadcrumb-passo').textContent = passo.titulo;

      document.querySelector('.page-header .step-meta .etapa-badge').textContent =
        `Etapa ${passo.etapa} · Passo ${passo.id}`;
      document.querySelector('.page-header h1').textContent = passo.titulo;
      document.querySelector('.page-header .step-subtitle').textContent = passo.subtitulo;

      let html = '';
      html = renderSecaoMedite(html, passo);
      html = renderSecaoAssista(html, passo);
      html = renderSecaoAprofunde(html, passo);
      html = renderSecaoPratique(html, passo);
      html = renderSecaoOrganizese(html, passo);
      html += renderNavegacao(passo, nav);

      container.innerHTML = html;
    })
    .catch(err => {
      container.innerHTML = `<p style="color:var(--color-muted);text-align:center;padding:2rem;">${err.message}</p>`;
    });
});
