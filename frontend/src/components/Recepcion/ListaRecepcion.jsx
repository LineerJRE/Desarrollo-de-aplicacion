import React from 'react';

function ListaPacientes({ pacientes }) {
    return (
      <div className="panel">
        <h2>Pacientes en espera</h2>
        <div class="area">
          <ul>
            {pacientes.map((p) => (
              <li key={p._id} className="li-item">
                <p><strong>{p.nombre}</strong></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  export default ListaPacientes;