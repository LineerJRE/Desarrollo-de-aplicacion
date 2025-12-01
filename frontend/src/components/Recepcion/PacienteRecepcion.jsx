import React from 'react';

function PacienteRecepcion({ pacienteActual, pacientesRestantes, llamarSiguiente, setMostrarExamenes }) {
    return (
      <div className="panel-central" style={{ textAlign: 'center' }}>
        <h1>Paciente en atención</h1>
        {pacienteActual ? (
          <>
            <h2><strong>Nombre:</strong> {pacienteActual.nombre}</h2>
            <h2><strong>Identificacion:</strong> {pacienteActual.documento}</h2>
            <button onClick={llamarSiguiente}>SIGUIENTE</button>
            <button onClick={() => setMostrarExamenes(true)} style={{ marginLeft: 10 }}>ATENDER</button>
          </>
        ) : (
          <>
            <h2>No hay paciente en atención</h2>
            {pacientesRestantes.length > 0 && (
              <button onClick={llamarSiguiente}>LLAMAR AL SIGUIENTE</button>
            )}
          </>
        )}
      </div>
    );
  }
  
  export default PacienteRecepcion;