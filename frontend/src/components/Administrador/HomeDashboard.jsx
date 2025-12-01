import React from 'react';
import '../../styles/HomeDashboard.css';

function HomeDashboard({ setVista }) {
  const opciones = [
    { titulo: 'Usuarios', icono: '👥', vista: 'usuarios' },
    { titulo: 'Aviso', icono: '📢', vista: 'aviso' },
  ];

  return (
    <div className="home-grid">
      {opciones.map((op, idx) => (
        <div key={idx} className="card" onClick={() => setVista(op.vista)}>
          <div className="card-icon">{op.icono}</div>
          <div className="card-title">{op.titulo}</div>
        </div>
      ))}
    </div>
  );
}

export default HomeDashboard;