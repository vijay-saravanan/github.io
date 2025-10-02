document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("projects-grid");

  fetch("./projects.json")
    .then(res => res.json())
    .then(data => {
      grid.innerHTML = data.map(projectCardHTML).join("");
    })
    .catch(err => {
      console.error("Error loading projects.json", err);
      grid.innerHTML = "<p>Unable to load projects.</p>";
    });
});

function projectCardHTML(p) {
  const img = p.image ? `assets/img/${p.image}` : "https://via.placeholder.com/400x250?text=No+Image";
  const repoBtn = p.repo ? `<a class="btn" href="${p.repo}" target="_blank">View Repo</a>` : "";
  const moreBtn = p.moreLink ? `<a class="btn" href="${p.moreLink}" target="_blank">Read Report</a>` : "";

  return `
    <article class="card project-card">
      <img src="${img}" alt="${p.title} image">
      <h3>${p.title}</h3>
      <p><i>${p.timeframe}</i></p>
      <p>${p.description}</p>
      <p><b>Tools:</b> ${p.tools.join(", ")}</p>
      <div class="cta">${repoBtn} ${moreBtn}</div>
    </article>
  `;
}
