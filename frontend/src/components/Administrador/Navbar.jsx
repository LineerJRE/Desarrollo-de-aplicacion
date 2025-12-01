import React from 'react';
import '../../styles/Navbar.css';

function Navbar({ usuario, onLogout }) {
  return (
    <header className="navbar">
      <h1 className="navbar-title">PANEL DE ADMINISTRACIÓN</h1>
      <div className="navbar-user">
        <span>{usuario}</span>
        <button className="logout-button" onClick={onLogout}>CERRAR SESIÓN</button>
      </div>
    </header>
  );
}

export default Navbar;