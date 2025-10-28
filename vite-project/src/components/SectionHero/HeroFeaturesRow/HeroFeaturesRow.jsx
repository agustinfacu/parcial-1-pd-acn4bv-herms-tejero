// ============================================================================
// Componente: HeroFeaturesRow
// Ubicación:  src/components/SectionHero/HeroFeaturesRow/HeroFeaturesRow.jsx
// ----------------------------------------------------------------------------
// Propósito:
//   - Renderiza la fila de características del Hero (ícono + texto).
//   - Mantiene la semántica del HTML original con role="list" y "listitem".
// Props:
//   - features: Array<{ id: string, text: string, icon: ReactNode }>
// Accesibilidad:
//   - Contenedor con role="list".
//   - Cada item con role="listitem".
// Estilos:
//   - CSS aislado en HeroFeaturesRow.css (clases .icons-row, .feature).
// ============================================================================

import React from "react";
import "./HeroFeaturesRow.css";

const HeroFeaturesRow = ({ features = [] }) => {
  return (
    <div className="icons-row" role="list" aria-label="Características destacadas">
      {features.map(({ id, text, icon }) => (
        <div key={id} className="feature" role="listitem">
          {/* Ícono (SVG) */}
          <span className="feature__icon" aria-hidden="true">
            {icon}
          </span>

          {/* Texto descriptivo */}
          <div className="feature__label">{text}</div>
        </div>
      ))}
    </div>
  );
};

export default HeroFeaturesRow;
