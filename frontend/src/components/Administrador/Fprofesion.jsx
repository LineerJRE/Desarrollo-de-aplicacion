import React, { useState } from 'react';
import axios from 'axios';
import ModalNotificacion from './ModalNotificacion';
import '../../styles/FormulariosModal.css';

function FormularioProfesion({ onClose }) {
  const [form, setForm] = useState({
    profesion: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [notificacion, setNotificacion] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/profesion/registrar', form);
      setForm({ profesion: ''});
      setNotificacion({ mensaje: 'Profesion creada con éxito', tipo: 'success' });
    } catch (err) {
      console.error(err);
      setNotificacion({ mensaje: 'Error al crear la profesion', tipo: 'error' });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h3>Crear Profesion</h3>
        {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Profesion" value={form.profesion}
            onChange={e => setForm({ ...form, profesion: e.target.value })} required />
          <button type="submit">GUARDAR</button>
          <button type="button" onClick={onClose}>CANCELAR</button>
        </form>
      </div>

      {notificacion && (
        <ModalNotificacion
          mensaje={notificacion.mensaje}
          tipo={notificacion.tipo}
          onClose={() => setNotificacion(null)}
        />
      )}
    </div>
  );
}

export default FormularioProfesion;