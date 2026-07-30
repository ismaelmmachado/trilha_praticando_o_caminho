const fs = require('fs');
const path = require('path');

const dados = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'dados', 'passos.json'), 'utf-8'));
const passos = dados.passos;

function renderParaComecar(passo) {
  if (passo.para_comecar) {
    const resumoHtml = escapeHtml(passo.para_comecar.resumo).replace(/\n/g, '<br>');
    const pdfUrl = escapeHtml(passo.para_comecar.apostila_pdf || '#');
    return `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon">📖</div>
      <h2>Para Começar</h2>
    </div>
    <div class="step-section-content">
      <p>${resumoHtml}</p>
      <div class="para-comecar-footer">
        <a href="${pdfUrl}" class="download-btn" target="_blank" download>
          <span class="download-icon">↓</span>
          Baixar Apostila
        </a>
      </div>
    </div>
  </div>`;
  }
  return renderMedite(passo);
}

function renderMedite(passo) {
  return `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon">📖</div>
      <h2>Medite</h2>
    </div>
    <div class="step-section-content">
      <span class="base-biblica">${escapeHtml(passo.medite.base_biblica)}</span>
      <p>${escapeHtml(passo.medite.devocional).replace(/\n/g, '<br>')}</p>
    </div>
  </div>`;
}

function renderOuca(passo) {
  if (passo.ouca) {
    const spotifyHtml = passo.ouca.spotify_url
      ? `<iframe src="${escapeHtml(passo.ouca.spotify_url)}" allowfullscreen class="spotify-embed"></iframe>`
      : '<p style="color:var(--color-muted);padding:2rem;text-align:center;">Em breve</p>';
    return `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon">🎧</div>
      <h2>Ouça: ${escapeHtml(passo.ouca.titulo)}</h2>
    </div>
    <div class="step-section-content">
      <div class="ouca-placeholder">${spotifyHtml}</div>
    </div>
  </div>`;
  }
  return renderAssista(passo);
}

function renderAssista(passo) {
  const videoHtml = passo.assista.url
    ? `<iframe src="${escapeHtml(passo.assista.url)}" allowfullscreen></iframe>`
    : '<p style="color:var(--color-muted);padding:2rem;text-align:center;">Vídeo em breve</p>';
  return `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon">🎬</div>
      <h2>Assista: ${escapeHtml(passo.assista.titulo)}</h2>
    </div>
    <div class="step-section-content">
      <div class="video-placeholder">${videoHtml}</div>
    </div>
  </div>`;
}

function renderAprofunde(passo) {
  if (passo.aprofunde && passo.aprofunde.livro !== undefined) {
    const livro = passo.aprofunde.livro;
    const musica = passo.aprofunde.musica;
    return `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon">📚</div>
      <h2>Aprofunde</h2>
    </div>
    <div class="step-section-content">
      <div class="aprofunde-boxes">
        <div class="aprofunde-box">
          <div class="aprofunde-box-header">
            <span class="aprofunde-box-icon">📖</span>
            <strong>Livro Sugerido</strong>
          </div>
          ${livro && livro.titulo ? `
          <div class="aprofunde-box-body">
            <span class="aprofunde-item-titulo">${escapeHtml(livro.titulo)}</span>
            ${livro.autor ? `<span class="aprofunde-item-autor">${escapeHtml(livro.autor)}</span>` : ''}
            ${livro.url ? `<a class="resource-link" href="${escapeHtml(livro.url)}" target="_blank">Acessar</a>` : '<span class="aprofunde-item-breve">Em breve</span>'}
          </div>` : '<p class="aprofunde-item-breve" style="padding:var(--space-md)">Em breve</p>'}
        </div>
        <div class="aprofunde-box">
          <div class="aprofunde-box-header">
            <span class="aprofunde-box-icon">🎵</span>
            <strong>Música Sugerida</strong>
          </div>
          ${musica && musica.titulo ? `
          <div class="aprofunde-box-body">
            <span class="aprofunde-item-titulo">${escapeHtml(musica.titulo)}</span>
            ${musica.artista ? `<span class="aprofunde-item-autor">${escapeHtml(musica.artista)}</span>` : ''}
            ${musica.url ? `<a class="resource-link" href="${escapeHtml(musica.url)}" target="_blank">Acessar</a>` : '<span class="aprofunde-item-breve">Em breve</span>'}
          </div>` : '<p class="aprofunde-item-breve" style="padding:var(--space-md)">Em breve</p>'}
        </div>
      </div>
    </div>
  </div>`;
  }
  if (!passo.aprofunde || passo.aprofunde.length === 0 || !Array.isArray(passo.aprofunde)) {
    return `<div class="step-section">
      <div class="step-section-header">
        <div class="section-icon">📚</div>
        <h2>Aprofunde</h2>
      </div>
      <div class="step-section-content">
        <p style="color:var(--color-muted)">Materiais complementares em breve.</p>
      </div>
    </div>`;
  }
  let html = `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon">📚</div>
      <h2>Aprofunde</h2>
    </div>
    <div class="step-section-content">
      <div class="resource-list">`;
  passo.aprofunde.forEach(r => {
    html += `<div class="resource-item">
      <div class="resource-info">
        <strong>${escapeHtml(r.titulo)}</strong>
        <span>${r.autor ? escapeHtml(r.autor) + ' · ' : ''}${escapeHtml(r.tipo)}</span>
      </div>
      ${r.url ? `<a class="resource-link" href="${escapeHtml(r.url)}" target="_blank">Acessar</a>` : '<span class="resource-link" style="opacity:0.5">Em breve</span>'}
    </div>`;
  });
  html += `</div></div></div>`;
  return html;
}

function renderPratique(passo) {
  return `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon">🎯</div>
      <h2>Pratique</h2>
    </div>
    <div class="step-section-content">
      ${passo.pratique.desafio ? `<p><strong>${escapeHtml(passo.pratique.desafio)}</strong></p>` : ''}
      <p style="margin-top:var(--space-md);color:var(--color-muted)">${escapeHtml(passo.pratique.instrucoes).replace(/\n/g, '<br>')}</p>
    </div>
  </div>`;
}

function renderOrganizese(passo) {
  if (passo.organizese.dias && passo.organizese.dias.some(d => d.dia.includes('feira') || d.dia === 'Sábado' || d.dia === 'Domingo')) {
    let html = `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon">📋</div>
      <h2>Organize-se</h2>
    </div>
    <div class="step-section-content">`;
    if (passo.organizese.desafio_semana) {
      html += `<div class="desafio-semana-box">
        <strong>Desafio da Semana</strong>
        <span>${escapeHtml(passo.organizese.desafio_semana).replace(/\n/g, '<br>')}</span>
      </div>`;
    }
    html += `<div class="organize-grid">`;
    passo.organizese.dias.forEach(d => {
      html += `<div class="organize-day">
        <strong>${escapeHtml(d.dia)}</strong>
        ${d.tema ? `<p>${escapeHtml(d.tema).replace(/\n/g, '<br>')}</p>` : '<p class="day-empty">—</p>'}
        ${d.leitura ? `<span class="day-leitura">${escapeHtml(d.leitura)}</span>` : ''}
      </div>`;
    });
    html += `</div></div></div>`;
    return html;
  }
  let html = `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon">📋</div>
      <h2>Organize-se</h2>
    </div>
    <div class="step-section-content">
      <div class="week-plan">`;
  passo.organizese.dias.forEach(d => {
    html += `<div class="week-day">
      <strong>${escapeHtml(d.dia)}</strong>
      <span class="day-tema">${escapeHtml(d.tema).replace(/\n/g, '<br>')}</span>
      ${d.leitura ? `<span class="day-leitura">${escapeHtml(d.leitura)}</span>` : ''}
    </div>`;
  });
  html += `</div></div></div>`;
  return html;
}

function renderNavegacao(passo, todosPassos) {
  const idx = todosPassos.findIndex(p => p.id === passo.id);
  const anterior = idx > 0 ? todosPassos[idx - 1] : null;
  const proximo = idx < todosPassos.length - 1 ? todosPassos[idx + 1] : null;
  let html = '<div class="step-nav">';
  if (anterior) {
    html += `<a href="passo-${anterior.id}.html" class="step-nav-link">← ${escapeHtml(anterior.titulo)}</a>`;
  } else {
    html += `<span class="step-nav-link disabled">← Anterior</span>`;
  }
  html += `<a href="index.html" class="step-nav-link">Início</a>`;
  if (proximo) {
    html += `<a href="passo-${proximo.id}.html" class="step-nav-link">${escapeHtml(proximo.titulo)} →</a>`;
  } else {
    html += `<span class="step-nav-link disabled">Próximo →</span>`;
  }
  html += '</div>';
  return html;
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function gerarPagina(passo, todosPassos) {
  const etapaNome = passo.etapa === 1 ? 'Curso Base' : 'As 9 Práticas';
  const etapaCor = passo.etapa === 1 ? 'amarela' : 'verde';
  const corAttr = passo.etapa === 1 ? 'data-etapa="1"' : 'data-etapa="2"';

  const isNewFormat = !!passo.para_comecar;

  const sections = isNewFormat
    ? [
        renderParaComecar(passo),
        renderOuca(passo),
        renderAprofunde(passo),
        renderPratique(passo),
        renderOrganizese(passo),
        renderNavegacao(passo, todosPassos)
      ]
    : [
        renderMedite(passo),
        renderAssista(passo),
        renderAprofunde(passo),
        renderPratique(passo),
        renderOrganizese(passo),
        renderNavegacao(passo, todosPassos)
      ];

  return `<!DOCTYPE html>
<html lang="pt-BR" ${corAttr}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(passo.titulo)} · Praticando o Caminho</title>
  <meta name="description" content="${escapeHtml(passo.subtitulo)} - Passo ${passo.id} da jornada de discipulado Praticando o Caminho." />
  <link rel="stylesheet" href="css/tokens.css" />
  <link rel="stylesheet" href="css/estilo.css" />
</head>
<body>
  <a class="skip-link" href="#main">Ir para o conteúdo</a>

  <header class="site-header" role="banner">
    <div class="container header-inner">
      <a href="index.html" class="logo" aria-label="Praticando o Caminho - Página inicial">
        Praticando o Caminho
        <span>Comunidade Vitral</span>
      </a>
      <nav class="nav" role="navigation" aria-label="Navegação principal">
        <a href="index.html">Início</a>
        <a href="complementar.html">Material Complementar</a>
        <a href="facilitador.html">Guia do Facilitador</a>
      </nav>
    </div>
  </header>

  <header class="mobile-header" role="banner">
    <nav class="mobile-nav" role="navigation" aria-label="Navegação principal">
      <a href="index.html">Início</a>
      <a href="complementar.html">Material</a>
      <a href="facilitador.html">Facilitador</a>
    </nav>
  </header>

  <main id="main">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Início</a>
        <span class="breadcrumb-sep">/</span>
        <span>${escapeHtml(passo.titulo)}</span>
      </nav>
    </div>

    <div class="container content-container">
      <div class="page-header">
        <div class="step-meta">
          <span class="etapa-badge">Etapa ${passo.etapa} · Passo ${passo.id}</span>
        </div>
        <h1>${escapeHtml(passo.titulo)}</h1>
        <p class="step-subtitle">${escapeHtml(passo.subtitulo)}</p>
      </div>

      <div id="passo-container">
        ${sections.join('\n      ')}
      </div>
    </div>
  </main>

  <footer class="site-footer" role="contentinfo">
    <div class="container footer-inner">
      <strong>Praticando o Caminho</strong>
      <p>Comunidade Vitral · Uma jornada de discipulado</p>
    </div>
  </footer>
</body>
</html>`;
}

passos.forEach(passo => {
  const html = gerarPagina(passo, passos);
  const filename = `passo-${passo.id}.html`;
  fs.writeFileSync(path.join(__dirname, '..', filename), html, 'utf-8');
  console.log(`Gerado: ${filename}`);
});

console.log('Todas as 17 páginas foram geradas com sucesso!');
