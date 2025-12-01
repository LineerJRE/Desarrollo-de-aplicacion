import React, { useState } from "react";
import axios from "axios";
import "../../styles/FormularioLoginAdmin.css"; 

function LoginModalRecepcion({ onLoginSuccess, setRecAutenticado }) {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData={usuario,contraseña}
    try {
      console.log(loginData)
      const res = await axios.post("http://localhost:5000/api/recepcionistas/login", loginData );
      const datosUsuario = res.data;
      localStorage.setItem("usuarioRecepcion", JSON.stringify(datosUsuario));
      onLoginSuccess(datosUsuario);
      setRecAutenticado(true);
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Iniciar Sesión Recepción</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={e => setContraseña(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">INICIAR SESIÒN</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModalRecepcion;