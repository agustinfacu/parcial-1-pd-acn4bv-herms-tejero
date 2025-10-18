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
            {/* boton de iniciar sesion */}
            {/* boton de crear cuenta */}
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

          {/* boton de iniciar sesión */}

            <div className="or">o</div>

            {/* boton de iniciar sesión con google */}
          </form>

          
        </aside>

    export default Sidebar;