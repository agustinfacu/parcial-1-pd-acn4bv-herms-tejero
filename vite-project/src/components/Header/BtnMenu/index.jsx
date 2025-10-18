// por convención los componentes van con PascalCase
function BtnMenu() {
  return (
    <>
      {/* Menú hamburguesa usuario */}
      <div className="header-actions">
        <button
          className="hamburger"
          id="menu-toggle"
          aria-expanded="false"
          aria-controls="sidebar"
          aria-label="Abrir menú"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
          >
            <path
              d="M3 6h18M3 12h18M3 18h18"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default BtnMenu;
