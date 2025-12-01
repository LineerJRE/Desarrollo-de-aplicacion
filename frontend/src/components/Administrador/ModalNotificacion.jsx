import React from 'react';
import '../../styles/Modal.css';

function ModalNotificacion({ mensaje, tipo = 'info', onClose }) {
  return (
    <div className="modal">
      <div className={`modal-contenido ${tipo}`}>
        <h3>{tipo === 'error' ? 'Error' : 'Éxito'}</h3>
        <p>{mensaje}</p>
        <div className="modal-botones">
          <button onClick={onClose}>CERRAR</button>
        </div>
      </div>
    </div>
  );
}

export default ModalNotificacion;