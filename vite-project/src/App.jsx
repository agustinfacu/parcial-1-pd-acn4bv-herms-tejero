import React from "react";
import Header from "./components/Header";
import SectionNews from "./components/SectionNews/SectionNews"; // ✅ Import del componente news
import SectionHero from "./components/SectionHero/Sectionhero"; // ✅ Import del componente hero

import "./App.css";

function App() {
  return (
    <>
      {/* Header / Navbar */}
      <Header />

      {/* Hero Section (React, modularizado) */}
      <SectionHero />   {/* ✅ usa tu componente real */}

      {/* Sección Informativa (puede quedar o moverla a otro componente) */}
      <section id="servicios" className="section">
        <h3>Nuestros Servicios</h3>
        <p>
          Acá podrías mostrar los servicios o características principales de tu
          landing original.
        </p>
      </section>

      {/* 📰 Noticias, Descuentos y Novedades */}
      <SectionNews />

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Mi Proyecto. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}


export default App;
