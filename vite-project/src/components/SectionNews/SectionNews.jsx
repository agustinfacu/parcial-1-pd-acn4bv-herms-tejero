// ============================================================================
// Componente: SectionNews (padre/orquestador)
// Ubicación : src/components/SectionNews/SectionNews.jsx
//
// Rol:
//   - Orquesta el bloque completo de "Noticias, Descuentos y Novedades".
//   - Mantiene el estado global de filtros (modo y categoría) y del paginado.
//   - Carga los datos (mock local en JSON) y aplica sort + filter.
//   - Renderiza: Título, Filters, Contenedor "news-box" + CardList, y Action.
//
// Decisiones de diseño (para README/Informe):
//   - "Recientes" = lista ordenada por fecha DESC.
//   - "Todas"     = orden natural (tal como vengan del JSON).
//   - Categoría   = filtra por coincidencia exacta dentro de item.categories.
//   - Paginado    = "Mostrar más" incrementa visibleCount en pasos fijos.
//
// Accesibilidad:
//   - <section aria-labelledby="noticias"> con título <h2 id="noticias">.
//   - Armoniza aria-controls entre el botón de "Mostrar más" y el contenedor visible.
//
// Notas de estilos:
//   - Este componente importa SectionNews.css con estilos COMPARTIDOS:
//       • .news-box (contenedor con scroll/tema)
//       • .btn, .btn.outline, .btn.small (botonería compartida)
//       • .section-title 
// ============================================================================

import React, { useMemo, useState } from "react";
import "./SectionNews.css";

import Filters from "./Filters/Filters";
import CardList from "./CardList/CardList";
import Action from "./Action/Action";

// Datos mock locales (puedes reemplazar luego por fetch a JSONBlob)
import data from "./data/newsData.json";

const INITIAL_STEP = 4;   // cantidad inicial a mostrar
const LOAD_MORE_STEP = 3; // incremento por clic en "Mostrar más"

export default function SectionNews() {
  // -----------------------------
  // Estado global de la sección
  // -----------------------------
  const [filterMode, setFilterMode] = useState("recientes");     // 'recientes' | 'todas'
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [visibleCount, setVisibleCount] = useState(INITIAL_STEP);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // -----------------------------
  // Helpers: categorías únicas
  // -----------------------------
  const allCategories = useMemo(() => {
    const set = new Set(["todas"]);
    (data || []).forEach((item) => {
      (item.categories || []).forEach((c) => set.add(c));
    });
    return Array.from(set);
  }, []);

  // -----------------------------
  // Derivación: aplicar sort + filter
  // -----------------------------
  const preparedItems = useMemo(() => {
    const list = Array.isArray(data) ? [...data] : [];

    // 1) Orden
    if (filterMode === "recientes") {
      list.sort((a, b) => {
        // comparar por dateISO desc; si falta, va al final
        const da = a.dateISO ? new Date(a.dateISO).getTime() : 0;
        const db = b.dateISO ? new Date(b.dateISO).getTime() : 0;
        return db - da;
      });
    }
    // "todas": se respeta el orden "natural" del JSON.

    // 2) Filtro por categoría
    if (selectedCategory && selectedCategory !== "todas") {
      return list.filter((item) =>
        Array.isArray(item.categories) &&
        item.categories.includes(selectedCategory)
      );
    }

    return list;
  }, [filterMode, selectedCategory]);

  // -----------------------------
  // Paginado: mostrar más
  // -----------------------------
  const canLoadMore = preparedItems.length > visibleCount;

  const handleLoadMore = () => {
    // Simulación de "cargando..." (opcional: útil para UX demo)
    setIsLoadingMore(true);
    // En una app real, aquí podrías hacer un fetch/paginación
    setTimeout(() => {
      setVisibleCount((n) => n + LOAD_MORE_STEP);
      setIsLoadingMore(false);
    }, 300);
  };

  // Si se cambia el modo o la categoría, reseteamos el visibleCount
  const handleModeChange = (mode) => {
    setFilterMode(mode);
    setVisibleCount(INITIAL_STEP);
  };
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setVisibleCount(INITIAL_STEP);
  };

  // ID para aria-controls (Action → contenedor visible)
  const listBoxId = "news-box";

  // -----------------------------
  // Render principal
  // -----------------------------
  return (
    <section aria-labelledby="noticias" className="wrap">
      <h2 id="noticias" className="section-title">
        Noticias, Descuentos y Novedades
      </h2>

      {/* Filtros superiores */}
      <Filters
        filterMode={filterMode}
        onFilterModeChange={handleModeChange}
        categories={allCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Contenedor visual principal (box con scroll interno) */}
      <div id={listBoxId} className="news-box">
        <CardList items={preparedItems} visibleCount={visibleCount} />
      </div>

      {/* Acción inferior: Mostrar más */}
      <Action
        onMore={handleLoadMore}
        disabled={!canLoadMore}
        isLoading={isLoadingMore}
        controlsId={listBoxId}
        label="Mostrar más"
        busyLabel="Cargando…"
      />
    </section>
  );
}
