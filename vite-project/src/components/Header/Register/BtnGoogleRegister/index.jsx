function BtnGoogleRegister() {
    // botón que va adentro del formulario de registro
  return (
    <>
      <button type="button" id="register-google" className="btn outline full">
        <span
          style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
          Registrarme con Google
        </span>
      </button>
    </>
  );
}

export default BtnGoogleRegister;
