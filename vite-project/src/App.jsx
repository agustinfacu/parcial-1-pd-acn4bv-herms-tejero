import React from "react";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <>
    
    {/* header / navbar */}
      
      <Header />
      {/* Hero Section */}
      <section id="inicio" className="hero">
        <div className="hero-content">
          <h2>Bienvenido a mi sitio</h2>
          <p>Este es el primer paso hacia la nueva versión en React 🚀</p>
          <button className="btn-primary">Empezar</button>
        </div>
      </section>

      {/* Sección Informativa */}
      <section id="servicios" className="section">
        <h3>Nuestros Servicios</h3>
        <p>
          Acá podrías mostrar los servicios o características principales de tu
          landing original.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Mi Proyecto. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}

export default App;