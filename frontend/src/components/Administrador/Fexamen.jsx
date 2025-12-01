import React, { useState } from 'react';
import axios from 'axios';
import ModalNotificacion from './ModalNotificacion';
import '../../styles/FormulariosModal.css';

function FormularioExamen({ onClose, DatoProfesion }) {
  const [form, setForm] = useState({
    examen: '',
    profesion: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [notificacion, setNotificacion] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/examen/registrar', form);
      setForm({ examen: '', profesion: ''});
      setNotificacion({ mensaje: 'Examen creado con éxito', tipo: 'success' });
    } catch (err) {
      console.error(err);
      setNotificacion({ mensaje: 'Error al crear examen', tipo: 'error' });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h3>Crear Examen</h3>
        {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Examen" value={form.examen}
            onChange={e => setForm({ ...form, examen: e.target.value })} required />
          <select value={form.profesion}
            onChange={e => setForm({ ...form, profesion: e.target.value })} required>
            <option value="">Seleccione profesión</option>
            {DatoProfesion.map((dato, index) => (
            <option key={index} value={dato.profesion}>
              {dato.profesion}
            </option>
            ))}
          </select>
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

export default FormularioExamen;