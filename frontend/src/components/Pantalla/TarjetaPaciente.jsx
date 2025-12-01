import React from 'react';

function TarjetaPaciente({ paciente }) {
  return (
    <div className="tarjeta-paciente">
      <p>
        <strong>Turno:</strong> {paciente.turno} &nbsp;
        <strong>Paciente:</strong> {paciente.nombre} &nbsp;
        {paciente.modulo && <><strong>Módulo:</strong> {paciente.modulo} &nbsp;</>}
        {paciente.consultorio && <><strong>Consultorio:</strong> {paciente.consultorio}</>}
      </p>
    </div>
  );
}

export default TarjetaPaciente;