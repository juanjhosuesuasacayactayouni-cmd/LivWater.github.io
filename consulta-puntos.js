const searchInput = document.getElementById("buscar-punto");
const categoryFilter = document.getElementById("filtro-categoria");
const resultStatus = document.getElementById("estado-consulta");
const noResultsMessage = document.getElementById("sin-resultados");
const mapButton = document.getElementById("mostrar-mapa");
const mapFigure = document.getElementById("mapa-puntos");
const waterPoints = Array.from(document.querySelectorAll(".respuesta[data-categoria]"));

if (
  !(searchInput instanceof HTMLInputElement) ||
  !(categoryFilter instanceof HTMLSelectElement) ||
  !(resultStatus instanceof HTMLElement) ||
  !(noResultsMessage instanceof HTMLElement) ||
  !(mapButton instanceof HTMLButtonElement) ||
  !(mapFigure instanceof HTMLElement) ||
  waterPoints.length === 0
) {
  throw new Error("No se encontraron los controles necesarios para consultar puntos hídricos.");
}

function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}

function updateResults() {
  const searchTerm = normalizeText(searchInput.value.trim());
  const selectedCategory = categoryFilter.value;
  let visibleCount = 0;

  waterPoints.forEach((point) => {
    const matchesCategory =
      selectedCategory === "todos" || point.dataset.categoria === selectedCategory;
    const matchesSearch = normalizeText(point.textContent).includes(searchTerm);
    const isVisible = matchesCategory && matchesSearch;

    point.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  noResultsMessage.hidden = visibleCount > 0;
  resultStatus.textContent = `Se encontraron ${visibleCount} ${
    visibleCount === 1 ? "punto" : "puntos"
  }. Información de demostración.`;

  mapButton.hidden = selectedCategory !== "dispensador";
  if (mapButton.hidden) {
    mapFigure.hidden = true;
    mapButton.setAttribute("aria-expanded", "false");
    mapButton.textContent = "Ver mapa de dispensadores";
  }
}

searchInput.addEventListener("input", updateResults);
categoryFilter.addEventListener("change", updateResults);
mapButton.addEventListener("click", () => {
  const showMap = mapFigure.hidden;
  mapFigure.hidden = !showMap;
  mapButton.setAttribute("aria-expanded", String(showMap));
  mapButton.textContent = showMap ? "Ocultar mapa" : "Ver mapa de dispensadores";
});
updateResults();
