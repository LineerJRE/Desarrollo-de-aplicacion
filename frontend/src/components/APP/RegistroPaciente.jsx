import React from 'react';
import '../../styles/RegistroPaciente.css';

function RegistroPaciente({
  nombre, setNombre,
  documento, setDocumento,
  turnoAsignado, registrarPaciente,
  siguienteRegistro, error
}) {
  return (
    <div className="registro-container">
      <h1 className="titulo">Registro de Pacientes</h1>

      {error && <div className="error">{error}</div>}

      {turnoAsignado ? (
        <div className="resultado">
          <h2>Turno asignado: <span>{turnoAsignado.turno}</span></h2>
          <button className="btn" onClick={siguienteRegistro}>SIGUIENTE</button>
        </div>
      ) : (
        <div className="formulario">
          <input
            className="input"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Número de documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
          />
          <button className="btn" onClick={registrarPaciente}>REGISTRAR</button>
        </div>
      )}
    </div>
  );
}

export default RegistroPaciente;