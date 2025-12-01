import React from 'react';

function AsignacionExamenes({ mostrar, mensaje, examenesDisponibles, seleccionados, toggleExamen, asignar }) {
    return (
      <div className="panel">
        {mostrar ? (
          <>
            <h2>Asignar Exámenes</h2>
              <div className="area">
                {examenesDisponibles.map((examen) => (
                  <div className="li-item" key={examen}>
                    <input
                      type="checkbox"
                      checked={seleccionados.includes(examen)}
                      onChange={() => toggleExamen(examen)}
                    />
                    <label>{examen}</label>
                  </div>
                ))}
              </div>
            <div>
                <button onClick={asignar}>ASIGNAR</button>
            </div>
          </>
        ) : mensaje ? (
          <h2>{mensaje}</h2>
        ) : null}
      </div>
    );
  }
  
  export default AsignacionExamenes;