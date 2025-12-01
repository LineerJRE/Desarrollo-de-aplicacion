import React from 'react';

function PacienteAtencion({ pacienteActual, manejarSiguiente, numeroConsultorio }) {
  return (
    <div className="paciente-atencion">
      <h1>Paciente en atención</h1>
      {pacienteActual ? (
        <>
          <h2>Turno: {pacienteActual.turno}</h2>
          <h3>{pacienteActual.nombre}</h3>
          <button onClick={manejarSiguiente} className="btn">SIGUIENTE</button>
        </>
      ) : (
        <>
          <p>No hay paciente en atención</p>
          <button onClick={manejarSiguiente} className="btn">LLAMAR AL PRIMERO</button>
        </>
      )}
    </div>
  );
}

export default PacienteAtencion;