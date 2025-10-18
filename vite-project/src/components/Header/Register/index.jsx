function Register() {
    return (
        <>
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

          

            <div className="or">o</div>

            {/* boton de crear cuenta con google */}
          </form>
        </>
    );
}   

export default Register;