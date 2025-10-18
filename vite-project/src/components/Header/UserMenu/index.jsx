function UserMenu() {
    return(
        <>
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
        
        </>
    )
};

export default UserMenu;