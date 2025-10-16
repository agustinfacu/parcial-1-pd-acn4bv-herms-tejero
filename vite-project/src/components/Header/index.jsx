import React from "react";
import "./index.css"; 

function Header() {
  return (
    <header>
      <div className="wrap header-bar">
        <div className="brand" aria-label="La Montaña">
          <div className="logo">
            <img src="./../../../public/images/icon.jpg" alt="icono" />
          </div>
          <div>
            <h1>La Montaña</h1>
            <p>Servicios de Impresión Profesional</p>
          </div>
        </div>

        {/* Chip de usuario logueado */}
        <div id="user-chip" className="user-chip" hidden>
          <span className="dot online" aria-label="Conectado" title="Conectado"></span>
          <span id="user-chip-email">usuario@example.com</span>
        </div>

        <div className="header-actions">
          {/* Menú hamburguesa usuario */}
          <button
            className="hamburger"
            id="menu-toggle"
            aria-expanded="false"
            aria-controls="sidebar"
            aria-label="Abrir menú"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white">
              <path d="M3 6h18M3 12h18M3 18h18" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Overlay para cerrar al click */}
        <div id="overlay" className="overlay" hidden></div>

        {/* Menú lateral */}
        <aside
          id="sidebar"
          className="sidebar"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sidebar-title"
          aria-hidden="true"
        >
          <div className="sidebar-header">
            <h2 id="sidebar-title">Tu cuenta</h2>
            <button id="sidebar-close" className="sidebar-close" aria-label="Cerrar menú">
              &times;
            </button>
          </div>

          {/* Tabs */}
          <div className="tabs" role="tablist" aria-label="Autenticación">
            <button
              className="tab active"
              role="tab"
              aria-selected="true"
              data-tab="login"
              id="tab-login"
            >
              Iniciar sesión
            </button>
            <button
              className="tab"
              role="tab"
              aria-selected="false"
              data-tab="register"
              id="tab-register"
            >
              Crear cuenta
            </button>
          </div>

          {/* Panel: Login */}
          <form id="form-login" className="panel active" role="tabpanel" aria-labelledby="tab-login">
            <label htmlFor="login-email">Correo</label>
            <input type="email" id="login-email" name="email" required autoComplete="email" />

            <label htmlFor="login-password">Contraseña</label>
            <input
              type="password"
              id="login-password"
              name="password"
              required
              autoComplete="current-password"
            />

            <button type="submit" className="btn full">Ingresar</button>

            <div className="or">o</div>

            <button type="button" id="login-google" className="btn outline full">
              <span style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                Ingresar con Google
              </span>
            </button>
          </form>

          {/* Panel: Registro */}
          <form
            id="form-register"
            className="panel"
            role="tabpanel"
            aria-labelledby="tab-register"
            hidden
          >
            <label htmlFor="reg-name">Nombre</label>
            <input type="text" id="reg-name" name="name" required autoComplete="name" />

            <label htmlFor="reg-email">Correo</label>
            <input type="email" id="reg-email" name="email" required autoComplete="email" />

            <label htmlFor="reg-password">Contraseña</label>
            <input
              type="password"
              id="reg-password"
              name="password"
              required
              autoComplete="new-password"
            />

            <button type="submit" className="btn full">Crear cuenta</button>

            <div className="or">o</div>

            <button type="button" id="register-google" className="btn outline full">
              <span style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                Registrarme con Google
              </span>
            </button>
          </form>

          {/* Menú visible solo si hay sesión */}
          <nav id="auth-menu" className="panel" role="menu" hidden>
            <a href="#" className="menu-item" role="menuitem">Dashboard personal</a>
            <a href="#" className="menu-item" role="menuitem">Encargar pedido nuevo</a>
            <a href="#" className="menu-item" role="menuitem">Pagos y facturas</a>
            <a href="#" className="menu-item" role="menuitem">Mis Datos</a>
            <a href="#" className="menu-item" role="menuitem">Inicio</a>
            <hr className="sep" />
            <button id="logout-btn" className="logout-btn" role="menuitem">
              Cerrar sesión
            </button>
          </nav>
        </aside>
      </div>
    </header>
  );
}

export default Header;
