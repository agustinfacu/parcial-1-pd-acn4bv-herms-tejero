// js/productos.api.js
// ==========================================
// Carga productos desde JSONBlob con FALLBACK
// a ./data.json (local). Renderiza filtros,
// paginado y "Mostrar más" (filas de 3 columnas).
// ==========================================

const API_URL = "https://jsonblob.com/api/jsonBlob/1424160473720479744";
// Fallback local 
const FALLBACK_URL = "./data.json";

// Estado
const servicios = [];
const categorias = [];
let categoriaActiva = "todas";
let visibles = 0;
let PAGE_SIZE = 6; // 2 filas x 3
const COLS = 3;    // "Mostrar más" agrega 1 fila (3)

// DOM refs
let filtrosEl, gridEl, boxEl, btnMas, statusEl;

// ===== Inicio seguro
document.addEventListener("DOMContentLoaded", async () => {
  filtrosEl = document.querySelector(".filters");
  gridEl    = document.getElementById("productos");
  boxEl     = document.getElementById("productos-box");
  btnMas    = document.getElementById("btn-productos-mas");
  statusEl  = document.getElementById("productos-status");

  if (boxEl && boxEl.dataset.pageSize) {
    const n = parseInt(boxEl.dataset.pageSize, 10);
    if (!Number.isNaN(n) && n > 0) PAGE_SIZE = n;
  }

  try {
    setBusy(true);
    const data = await cargarDataConFallback();
    inyectarDatos(data);
    pintarFiltros();
    wireEvents();
    aplicarFiltro("todas");
  } catch (err) {
    console.error("Error inicializando productos:", err);
    announce("No se pudieron cargar los productos.");
  } finally {
    setBusy(false);
  }
});

// ===== Fetch con timeout + fallback
async function cargarDataConFallback() {
  try {
    const dataRemota = await fetchConTimeout(API_URL, { timeout: 7000 });
    if (!dataRemota.ok) throw new Error(`HTTP ${dataRemota.status}`);
    return await dataRemota.json();
  } catch (e) {
    console.warn("[productos] Remoto falló, usando fallback local:", e?.message || e);
    const dataLocal = await fetch(FALLBACK_URL);
    if (!dataLocal.ok) throw new Error(`Fallback HTTP ${dataLocal.status}`);
    return await dataLocal.json();
  }
}

function fetchConTimeout(url, { timeout = 7000, ...opts } = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return fetch(url, { ...opts, signal: controller.signal }).finally(() => clearTimeout(id));
}

// ===== Cargar arrays de estado
function inyectarDatos(data) {
  const catData = data?.productos?.categorias ?? [];
  const srvData = data?.productos?.servicios ?? [];

  categorias.splice(0, categorias.length, ...catData);
  servicios.splice(0, servicios.length, ...srvData);
}

// ===== Filtros
function pintarFiltros() {
  if (!filtrosEl) return;
  filtrosEl.innerHTML = "";

  // Pintar exactamente las categorías provistas por la API (incluida "Todas")
  categorias.forEach((cat, i) => {
    const id    = toSlug(cat?.id ?? cat?.label ?? `cat-${i}`);
    const label = cat?.label ?? (cat?.id ?? `Categoría ${i + 1}`);
    const active = id === "todas" ? "active" : "";
    const ariaSel = id === "todas" ? "true" : "false";

    filtrosEl.insertAdjacentHTML(
      "beforeend",
      `<button class="chip ${active}" role="tab" aria-selected="${ariaSel}" data-filter="${id}">${label}</button>`
    );
  });
}

function wireEvents() {
  if (filtrosEl) {
    filtrosEl.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      setActive(btn);
      aplicarFiltro(btn.getAttribute("data-filter"));
      // Llevar al inicio del contenedor scrollable al cambiar filtro
      document.getElementById("productos-box")?.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (btnMas) {
    btnMas.addEventListener("click", () => {
      renderProductos(visibles + COLS); // +1 fila
    });
  }
}

// ===== Lógica filtro + render
function aplicarFiltro(filtro) {
  categoriaActiva = filtro || "todas";
  renderProductos(PAGE_SIZE); // 2 filas iniciales
}

function renderProductos(n) {
  if (!gridEl) return;
  const lista = filtrarServicios(categoriaActiva);

  visibles = Math.min(n, lista.length);
  gridEl.innerHTML = "";

  const frag = document.createDocumentFragment();
  for (let i = 0; i < visibles; i++) {
    frag.appendChild(renderCard(lista[i]));
  }
  gridEl.appendChild(frag);

  if (btnMas) {
  // Mostrar el botón sólo si quedan productos por ver
  btnMas.hidden   = lista.length <= visibles;
  btnMas.disabled = visibles >= lista.length;
}

  announce(`${visibles} de ${lista.length} productos mostrados`);
}

function filtrarServicios(filtro) {
  const slug = toSlug(filtro);
  if (slug === "todos" || slug === "todas") {
    return [...servicios];
  }

  return servicios.filter((s) => {
    const cats = Array.isArray(s.categorias) ? s.categorias : (s.categoria ? [s.categoria] : []);
    return cats.map(toSlug).includes(slug);
  });
}

// ===== Tarjeta
function renderCard(prod) {
  const art = document.createElement("article");
  art.className = "product";
  art.setAttribute("aria-labelledby", `p-${prod.id ?? ""}`);

  const precioTxt = prod.precio ? String(prod.precio) : "";

  art.innerHTML = `
    <img src="${prod.imagen || ""}" alt="${escapeAttr(prod.alt || prod.nombre || "Producto")}">
    <div class="body">
      <div style="display:flex;justify-content:space-between;align-items:start">
        <div>
          <h4 id="p-${prod.id ?? ""}" style="margin:0;font-size:16px;font-weight:700">
            ${escapeHtml(prod.nombre ?? "Producto")}
          </h4>
          <div style="color:var(--muted);font-size:13px;margin-top:6px">
            ${escapeHtml(prod.descripcion ?? "")}
          </div>
        </div>
        <div style="margin-left:8px">
          <span class="price-pill">${escapeHtml(precioTxt)}</span>
        </div>
      </div>
      <div class="actions" style="margin-top:6px">
        <button class="btn-add" aria-label="Agregar ${escapeAttr(prod.nombre ?? "producto")}">Agregar</button>
      </div>
    </div>
  `;

  art.querySelector(".btn-add")?.addEventListener("click", () => {
    const ok = confirm(`¿Agregar "${prod.nombre}" al carrito?`);
    if (ok) {
      const items = JSON.parse(localStorage.getItem("carrito") || "[]");
      items.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio || 0 });
      localStorage.setItem("carrito", JSON.stringify(items));
      alert("Producto agregado ✅");
    }
  });

  return art;
}

// ===== Helpers
function setActive(btn) {
  filtrosEl?.querySelectorAll("button[data-filter]").forEach((b) => {
    b.classList.remove("active");
    b.setAttribute("aria-selected", "false");
  });
  btn.classList.add("active");
  btn.setAttribute("aria-selected", "true");
}

function setBusy(flag) {
  document.getElementById("productos")?.setAttribute("aria-busy", flag ? "true" : "false");
}

function announce(msg) {
  const el = document.getElementById("productos-status");
  if (el) el.textContent = msg;
}

function toSlug(txt) {
  return String(txt || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, "&quot;");
}
