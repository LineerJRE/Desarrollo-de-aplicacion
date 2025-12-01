import React from 'react';
import '../../styles/Modal.css';

function ModalConfirmacion({ mensaje, onConfirm, onCancel }) {
  return (
    <div className="modal">
      <div className="modal-contenido">
        <h3>Confirmar acción</h3>
        <p>{mensaje}</p>
        <div className="modal-botones">
          <button onClick={onConfirm} className="confirmar">SÍ, ELIMINAR</button>
          <button onClick={onCancel} className="cancelar">CANCELAR</button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacion;