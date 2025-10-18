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
     
        {/* Overlay para cerrar al click */}
        <div id="overlay" className="overlay" hidden></div>

      </div>
    </header>
  );
}

export default Header;
