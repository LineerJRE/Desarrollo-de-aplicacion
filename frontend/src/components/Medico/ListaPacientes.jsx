import React from 'react';

function ListaPacientes({ pacientes }) {
  return (
    <div className="lista-pacientes">
      <h2>Pacientes En espera</h2>
      {pacientes.length === 0 ? (
        <p>No hay pacientes en espera</p>
      ) : (
        pacientes.map((p, i) => (
          <div key={i} className="paciente-item">
            <p><strong>{p.nombre}</strong></p>
          </div>
        ))
      )}
    </div>
  );
}

export default ListaPacientes;