const fs = require('fs');
const path = require('path');

const dados = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'dados', 'passos.json'), 'utf-8'));
const passos = dados.passos;

function renderParaComecar(passo) {
  if (passo.para_comecar) {
    const resumoHtml = escapeHtml(passo.para_comecar.resumo).replace(/\n/g, '<br>');
    const pdfUrl = passo.para_comecar.apostila_pdf && passo.para_comecar.apostila_pdf !== '#' ? escapeHtml(passo.para_comecar.apostila_pdf) : null;
    return `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon" aria-hidden="true">📖</div>
      <h2>Para Começar</h2>
    </div>
    <div class="step-section-content">
      <p>${resumoHtml}</p>
      <div class="para-comecar-footer">
        ${pdfUrl
          ? `<a href="${pdfUrl}" class="download-btn" target="_blank" download>
          <span class="download-icon" aria-hidden="true">↓</span>
          Baixar Apostila em PDF
        </a>`
          : `<span class="download-btn is-empty">Em breve</span>`}
      </div>
    </div>
  </div>`;
  }
  return renderMedite(passo);
}

function renderParaTeAjudar() {
  return `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon" aria-hidden="true">🛠️</div>
      <h2>Ferramentas para o Caminho</h2>
    </div>
    <div class="step-section-content">
      <p class="ferramentas-intro">Ferramentas que podem apoiar sua caminhada:</p>
      <div class="ferramentas-list">
        <div class="ferramenta-item">
          <div class="ferramenta-item-content">
            <span class="ferramenta-icon" aria-hidden="true">📖</span>
            <div class="ferramenta-info">
              <strong>Bible App (YouVersion)</strong>
              <span>A Bíblia no seu bolso. Siga a Comunidade Vitral.</span>
            </div>
          </div>
          <a class="ferramenta-link" href="https://www.bible.com/organizations/79172d03-a943-4051-aebf-285b525546f1" target="_blank">Baixar</a>
        </div>
        <div class="ferramenta-item">
          <div class="ferramenta-item-content">
            <span class="ferramenta-icon" aria-hidden="true">🙏</span>
            <div class="ferramenta-info">
              <strong>Lectio 365</strong>
              <span>Devocional diário em português. Ore com a Bíblia.</span>
            </div>
          </div>
          <a class="ferramenta-link" href="https://lectio365.com/pt-br/o-aplicativo/" target="_blank">Baixar</a>
        </div>
        <div class="ferramenta-item">
          <div class="ferramenta-item-content">
            <span class="ferramenta-icon" aria-hidden="true">🎙️</span>
            <div class="ferramenta-info">
              <strong>Vitral no Spotify</strong>
              <span>Podcast da Comunidade Vitral para sua jornada.</span>
            </div>
          </div>
          <a class="ferramenta-link" href="https://open.spotify.com/show/1prjsrcxPho9otrP1VUWT4" target="_blank">Ouvir</a>
        </div>
      </div>
    </div>
  </div>`;
}

function renderMedite(passo) {
  return `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon" aria-hidden="true">📖</div>
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
      <div class="section-icon" aria-hidden="true">🎧</div>
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
      <div class="section-icon" aria-hidden="true">🎬</div>
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
    const renderItem = (icone, label, item) => {
      if (item && item.titulo) {
        return `<div class="aprofunde-item">
          <div class="aprofunde-item-content">
            <span class="aprofunde-item-icon" aria-hidden="true">${icone}</span>
            <div class="aprofunde-item-info">
              <strong>${escapeHtml(item.titulo)}</strong>
              <span>${item.autor || item.artista ? escapeHtml(item.autor || item.artista) + ' · ' : ''}${label}</span>
            </div>
          </div>
          ${item.url ? `<a class="aprofunde-link" href="${escapeHtml(item.url)}" target="_blank">Acessar</a>` : '<span class="aprofunde-link is-empty">Em breve</span>'}
        </div>`;
      }
      return `<div class="aprofunde-item">
        <div class="aprofunde-item-content">
          <span class="aprofunde-item-icon" aria-hidden="true">${icone}</span>
          <div class="aprofunde-item-info">
            <strong>${label}</strong>
            <span>Em breve</span>
          </div>
        </div>
        <span class="aprofunde-link is-empty">Em breve</span>
      </div>`;
    };
    return `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon" aria-hidden="true">📚</div>
      <h2>Aprofunde</h2>
    </div>
    <div class="step-section-content">
      <div class="aprofunde-list">
        ${renderItem('📖', 'Livro Sugerido', livro)}
        ${renderItem('🎵', 'Música Sugerida', musica)}
      </div>
    </div>
  </div>`;
  }
  if (!passo.aprofunde || passo.aprofunde.length === 0 || !Array.isArray(passo.aprofunde)) {
    return `<div class="step-section">
      <div class="step-section-header">
        <div class="section-icon" aria-hidden="true">📚</div>
        <h2>Aprofunde</h2>
      </div>
      <div class="step-section-content">
        <p style="color:var(--color-muted)">Materiais complementares em breve.</p>
      </div>
    </div>`;
  }
  let html = `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon" aria-hidden="true">📚</div>
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
  if (passo.pratique.experimento) {
    return `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon" aria-hidden="true">🎯</div>
      <h2>Pratique</h2>
    </div>
    <div class="step-section-content">
      <div class="pratique-experimento">
        <strong class="pratique-label">Praticar</strong>
        <p>${escapeHtml(passo.pratique.experimento)}</p>
      </div>
      ${passo.pratique.pergunta ? `<div class="pratique-pergunta">
        <strong>Pergunta da semana</strong>
        <p>${escapeHtml(passo.pratique.pergunta)}</p>
      </div>` : ''}
    </div>
  </div>`;
  }
  return `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon" aria-hidden="true">🎯</div>
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
      <div class="section-icon" aria-hidden="true">📋</div>
      <h2>Organize-se</h2>
    </div>
    <div class="step-section-content">
      <div class="week-plan-grid">`;
    passo.organizese.dias.forEach(d => {
      html += `<div class="week-day-card">
        <strong>${escapeHtml(d.dia)}</strong>
        ${d.tema ? `<span>${escapeHtml(d.tema).replace(/\n/g, '<br>')}</span>` : '<span class="day-empty">Em breve</span>'}
        ${d.leitura ? `<span class="day-leitura">${escapeHtml(d.leitura)}</span>` : ''}
      </div>`;
    });
    html += `</div></div></div>`;
    return html;
  }
  let html = `<div class="step-section">
    <div class="step-section-header">
      <div class="section-icon" aria-hidden="true">📋</div>
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
  const etapaNome = passo.etapa === 1 ? 'Início da Jornada' : 'As 9 Práticas';
  const etapaCor = passo.etapa === 1 ? 'amarela' : 'verde';
  const corAttr = passo.etapa === 1 ? 'data-etapa="1"' : 'data-etapa="2"';

  const isNewFormat = !!passo.para_comecar;

  const sections = isNewFormat
    ? [
        renderParaComecar(passo),
        renderParaTeAjudar(),
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
        <a href="mapa.html">Mapa</a>
      </nav>
    </div>
  </header>

  <header class="mobile-header" role="banner">
    <nav class="mobile-nav" role="navigation" aria-label="Navegação principal">
      <a href="index.html">Início</a>
      <a href="complementar.html">Material</a>
      <a href="mapa.html">Mapa</a>
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
          <span class="step-counter">Passo ${passo.id} de ${todosPassos.length}</span>
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
      <a href="#" class="back-to-top" aria-label="Voltar ao topo">↑ Voltar ao topo</a>
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
