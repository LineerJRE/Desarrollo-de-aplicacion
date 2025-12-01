import React from 'react';
import TarjetaPaciente from './TarjetaPaciente';

function ListaLlamados({ ultimosLlamados }) {
  return (
    <div className="llamados-lista">
      {ultimosLlamados.map((paciente, index) => (
        <TarjetaPaciente key={index} paciente={paciente} />
      ))}
    </div>
  );
}

export default ListaLlamados;