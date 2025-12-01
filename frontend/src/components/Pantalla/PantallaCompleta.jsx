import React from 'react';

function PantallaCompleta({ paciente }) {
  return (
    <div className="pantalla-completa">
      <div style={{ textAlign: 'center' }}>
        <h1>Turno: {paciente.turno}</h1>
        <h2>{paciente.nombre}</h2>
        {paciente.modulo && <p>Módulo: {paciente.modulo}</p>}
        {paciente.consultorio && <p>Consultorio: {paciente.consultorio}</p>}
      </div>
    </div>
  );
}

export default PantallaCompleta;