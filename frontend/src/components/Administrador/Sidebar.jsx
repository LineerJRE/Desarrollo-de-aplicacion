import React from 'react';
import '../../styles/Sidebar.css';

function Sidebar({ setVista, vistaActual }) {
  return (
    <aside className="sidebar">
      <ul>
        <li className={vistaActual === 'home' ? 'active' : ''} onClick={() => setVista('home')}>🏠 HOME</li>
        <li className={vistaActual === 'usuarios' ? 'active' : ''} onClick={() => setVista('usuarios')}>👥 USUARIOS</li>
        <li className={vistaActual === 'catalogo' ? 'active' : ''} onClick={() => setVista('catalogo')}>🗂️ CATALOGO</li>
        <li className={vistaActual === 'aviso' ? 'active' : ''} onClick={() => setVista('aviso')}>📢 AVISO</li>
      </ul>
    </aside>
  );
}

export default Sidebar;