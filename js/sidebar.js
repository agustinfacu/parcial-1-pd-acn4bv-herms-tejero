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
// ==== Tabs: alternar entre Login y Registro ====

// Elementos de tabs y paneles
const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");
const panelLogin = document.getElementById("form-login");
const panelRegister = document.getElementById("form-register");

// Función para activar una pestaña y su panel
function activarTab(tipo) {
  const esLogin = tipo === "login";

  // Marcar visualmente la pestaña activa
  tabLogin?.classList.toggle("active", esLogin);
  tabRegister?.classList.toggle("active", !esLogin);

  // ARIA: cuál está seleccionada
  tabLogin?.setAttribute("aria-selected", String(esLogin));
  tabRegister?.setAttribute("aria-selected", String(!esLogin));

  // Mostrar/ocultar paneles con hidden + clase
  panelLogin.hidden = !esLogin;
  panelRegister.hidden = esLogin;
  panelLogin.classList.toggle("active", esLogin);
  panelRegister.classList.toggle("active", !esLogin);

  // Enfocar el primer input del panel activo
  const primerInput = (esLogin ? panelLogin : panelRegister).querySelector("input");
  primerInput?.focus();
}

// Listeners de click en las tabs
tabLogin?.addEventListener("click", () => activarTab("login"));
tabRegister?.addEventListener("click", () => activarTab("register"));

// ==== Botones Google (mock) ====
    
    const btnGoogleLogin = document.getElementById("login-google");
    const btnGoogleRegister = document.getElementById("register-google");

    function mockGoogleUser() {
    // Datos simulados (podrías pedir nombre con prompt() si querés)
    return new Usuario("Google User", "google.user@example.com");
    }

    function onGoogleAccess() {
    const user = mockGoogleUser();
    AuthManager.guardar(user);
    alert(`${user.saludo()} — acceso con Google (mock).`);
    closeMenu();
    }

    btnGoogleLogin?.addEventListener("click", onGoogleAccess);
    btnGoogleRegister?.addEventListener("click", onGoogleAccess);

    document.addEventListener("DOMContentLoaded", () => {
    const u = AuthManager.leer();
    if (u) {
        const title = document.getElementById("sidebar-title");
        if (title) title.textContent = `Hola, ${u.nombre}`;
    }
    });


