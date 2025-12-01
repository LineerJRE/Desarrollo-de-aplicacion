import React, { useState } from 'react';
import '../../styles/Modal.css';

function ModalCambiarClave({ usuario, onClose, onSave }) {
  const [nuevaClave, setNuevaClave] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nuevaClave.trim().length < 4) {
      return alert('La contraseña debe tener al menos 4 caracteres');
    }
    onSave(usuario, nuevaClave);
  };

  return (
    <div className="modal">
      <div className="modal-contenido">
        <h3>Cambiar Contraseña</h3>
        <form onSubmit={handleSubmit}>
          <label>Nueva contraseña:
            <input type="password" value={nuevaClave} onChange={(e) => setNuevaClave(e.target.value)} required />
          </label>
          <div className="modal-botones">
            <button type="submit">ACTUALIZAR</button>
            <button type="button" onClick={onClose} className="cancelar">CANCELAR</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCambiarClave;