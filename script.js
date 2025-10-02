// script.js
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('projects-grid');

  fetch('projects.json')
    .then(res => {
      if (!res.ok) throw new Error('Could not load projects.json');
      return res.json();
    })
    .then(data => renderProjects(data, grid))
    .catch(err => {
      console.error(err);
      grid.innerHTML = '<p class="muted">Projects could not be loaded. Check projects.json or enable JavaScript.</p>';
    });
});

function renderProjects(projects, container) {
  if (!Array.isArray(projects) || projects.length === 0) {
    container.innerHTML = '<p class="muted">No projects found in projects.json</p>';
    return;
  }

  container.innerHTML = projects.map(projectCardHTML).join('\n');
}

function projectCardHTML(p) {
  const img = p.image ? `assets/img/${p.image}` : 'assets/img/placeholder.png';
  const repoBtn = p.repo ? `<a class="btn" href="${p.repo}" target="_blank" rel="noopener">View Repo</a>` : '';
  const more = p.moreLink ? `<a class="btn" href="${p.moreLink}" target="_blank" rel="noopener">More</a>` : '';

  return `
    <article class="card project-card" aria-labelledby="proj-${esc(p.title)}">
      <img src="${img}" alt="${esc(p.title)} screenshot or prototype image">
      <h3 id="proj-${esc(p.title)}">${esc(p.title)}</h3>
      <p class="meta">${esc(p.timeframe || '')} — ${esc(p.role || '')}</p>
      <p>${esc(p.description)}</p>
      <div class="tags" style="margin-top:0.6rem">
        ${ (p.tools || []).slice(0,5).map(t => `<span class="badge">${esc(t)}</span>`).join('') }
      </div>
      <div style="margin-top:0.75rem;display:flex;gap:.5rem;flex-wrap:wrap">
        ${repoBtn} ${more}
      </div>
    </article>
  `;
}

// small escape function to avoid injecting raw html
function esc(s){
  if(!s && s !== 0) return '';
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'","&#39;");
}
