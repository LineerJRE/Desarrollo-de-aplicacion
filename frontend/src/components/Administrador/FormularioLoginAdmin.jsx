import React from 'react';
import '../../styles/FormularioLoginAdmin.css';

function FormularioLoginAdmin({ loginData, setLoginData, handleLogin, mensaje }) {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Iniciar Sesión de Administrador</h2>
        {mensaje && <p className="login-error">{mensaje}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario"
            value={loginData.usuario}
            onChange={e => setLoginData({ ...loginData, usuario: e.target.value })}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={loginData.contraseña}
            onChange={e => setLoginData({ ...loginData, contraseña: e.target.value })}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">INICIAR SESIÒN</button>
        </form>
      </div>
    </div>
  );
}

export default FormularioLoginAdmin;