// ==== Sidebar: abrir/cerrar con hamburguesa y con la X ====
// Elementos
const btnToggle = document.getElementById("menu-toggle");
const sidebar   = document.getElementById("sidebar");
const btnClose  = document.getElementById("sidebar-close");

// helpers ARIA
const setAria = (open) => {
  sidebar.setAttribute("aria-hidden", String(!open));
  btnToggle.setAttribute("aria-expanded", String(open));
};

// abrir/cerrar
const openMenu = () => {
  sidebar.classList.add("active");
  setAria(true);
};

const closeMenu = () => {
  sidebar.classList.remove("active");
  setAria(false);
  btnToggle?.focus();
};

// listeners
btnToggle?.addEventListener("click", () => {
  if (sidebar.classList.contains("active")) closeMenu();
  else openMenu();
});

btnClose?.addEventListener("click", closeMenu);
