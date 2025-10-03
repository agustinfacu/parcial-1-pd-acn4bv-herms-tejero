// ==============================
// Sidebar + Auth UI (Login/Registro/Google mock)
// ==============================

// --- Elementos base ---
const btnToggle = document.getElementById("menu-toggle");
const sidebar   = document.getElementById("sidebar");
const btnClose  = document.getElementById("sidebar-close");
const overlay   = document.getElementById("overlay"); // si no existe, queda undefined y no pasa nada

// --- Tabs (login/registro) ---
const tabsContainer = document.querySelector(".tabs");
const tabLogin     = document.getElementById("tab-login");
const tabRegister  = document.getElementById("tab-register");
const panelLogin   = document.getElementById("form-login");
const panelRegister= document.getElementById("form-register");

// --- UI autenticado ---
const userChip      = document.getElementById("user-chip");
const userChipEmail = document.getElementById("user-chip-email");
const authMenu      = document.getElementById("auth-menu");
const logoutBtn     = document.getElementById("logout-btn");

// --- Botones Google (mock) ---
const btnGoogleLogin    = document.getElementById("login-google");
const btnGoogleRegister = document.getElementById("register-google");

// ==============================
// Helpers de accesibilidad/UI
// ==============================
const setAria = (open) => {
  sidebar.setAttribute("aria-hidden", String(!open));
  btnToggle.setAttribute("aria-expanded", String(open));
  if (overlay) overlay.hidden = !open;                  // mostrar/ocultar overlay si existe
  document.body.classList.toggle("no-scroll", open);    // requiere regla CSS body.no-scroll
};

const openMenu = () => {
  sidebar.classList.add("active");
  setAria(true);
  // foco en el primer input disponible dentro del panel activo
  const firstInput =
    (panelLogin.hidden ? panelRegister : panelLogin)?.querySelector("input");
  firstInput?.focus();
};

const closeMenu = () => {
  sidebar.classList.remove("active");
  setAria(false);
  btnToggle?.focus(); // devolver foco al botón hamburguesa
};

// ==============================
// Tabs: alternar entre Login y Registro
// ==============================
function activarTab(tipo) {
  const esLogin = tipo === "login";

  tabLogin?.classList.toggle("active", esLogin);
  tabRegister?.classList.toggle("active", !esLogin);

  tabLogin?.setAttribute("aria-selected", String(esLogin));
  tabRegister?.setAttribute("aria-selected", String(!esLogin));

  panelLogin.hidden    = !esLogin;
  panelRegister.hidden =  esLogin;

  panelLogin.classList.toggle("active", esLogin);
  panelRegister.classList.toggle("active", !esLogin);

  (esLogin ? panelLogin : panelRegister).querySelector("input")?.focus();
}

// ==============================
// Refrescar UI según sesión
// ==============================
function refreshAuthUI() {
  const u = window.AuthManager?.leer();
  const title = document.getElementById("sidebar-title");

  if (u) {
    // Header: chip visible + email
    userChip?.removeAttribute("hidden");
    if (userChipEmail) userChipEmail.textContent = u.email;

    // Sidebar: ocultar tabs/forms; mostrar menú autenticado
    tabsContainer?.setAttribute("hidden", "");
    panelLogin.hidden = true;
    panelRegister.hidden = true;
    authMenu?.removeAttribute("hidden");

    if (title) title.textContent = `Hola, ${u.nombre}`;
  } else {
    // Header: ocultar chip
    userChip?.setAttribute("hidden", "");

    // Sidebar: mostrar tabs + login por defecto; ocultar menú
    tabsContainer?.removeAttribute("hidden");
    authMenu?.setAttribute("hidden", "");
    activarTab("login");

    if (title) title.textContent = "Tu cuenta";
  }
}

// ==============================
// Listeners
// ==============================

// Abrir/cerrar sidebar
btnToggle?.addEventListener("click", () =>
  sidebar.classList.contains("active") ? closeMenu() : openMenu()
);
btnClose?.addEventListener("click", closeMenu);
overlay?.addEventListener("click", closeMenu); 
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebar.classList.contains("active")) {
    closeMenu();
  }
});

// Tabs
tabLogin?.addEventListener("click", () => activarTab("login"));
tabRegister?.addEventListener("click", () => activarTab("register"));

// Login por formulario
panelLogin?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email    = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!email || !password) return alert("Completá correo y contraseña.");

  const nombre = email.split("@")[0] || "Usuario";
  const u = new Usuario(nombre, email);

  AuthManager.guardar(u);
  alert(`${u.saludo()} — sesión iniciada.`);
  refreshAuthUI();
  closeMenu();
});

// Registro por formulario
panelRegister?.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre   = document.getElementById("reg-name").value.trim();
  const email    = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();

  if (!nombre || !email || !password) return alert("Completá todos los datos.");

  const u = new Usuario(nombre, email);

  AuthManager.guardar(u);
  alert(`${u.saludo()} — cuenta creada.`);
  refreshAuthUI();
  closeMenu();
});

// Google mock
function googleMockLogin() {
  const u = new Usuario("Google User", "google.user@example.com");
  AuthManager.guardar(u);
  alert(`${u.saludo()} — acceso con Google (mock).`);
  refreshAuthUI();
  closeMenu();
}
btnGoogleLogin?.addEventListener("click", googleMockLogin);
btnGoogleRegister?.addEventListener("click", googleMockLogin);

// Logout
logoutBtn?.addEventListener("click", () => {
  AuthManager.borrar();
  alert("Sesión cerrada.");
  refreshAuthUI();
});

// Inicializar estado al cargar
document.addEventListener("DOMContentLoaded", () => {
  setAria(false);   
  refreshAuthUI();  
});
