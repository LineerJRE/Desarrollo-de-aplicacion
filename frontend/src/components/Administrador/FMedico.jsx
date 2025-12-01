import React, { useState } from 'react';
import axios from 'axios';
import ModalNotificacion from './ModalNotificacion';
import '../../styles/FormulariosModal.css';

function FormularioMedico({ onClose }) {
  const [form, setForm] = useState({
    nombre: '',
    identificacion: '',
    usuario: '',
    contraseña: '',
    profesion: '',
    consultorio: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [notificacion, setNotificacion] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/medicos', form);
      setForm({
        nombre: '',
        identificacion: '',
        usuario: '',
        contraseña: '',
        profesion: '',
        consultorio: '',
      });
      setNotificacion({ mensaje: 'Médico creado con éxito', tipo: 'success' });
    } catch (err) {
      console.error(error);
      setNotificacion({ mensaje: 'Error al crear usuario médico', tipo: 'error' });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h3>Crear Usuario Médico</h3>
        {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombre" value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })} required />
          <input type="text" placeholder="Identificación" value={form.identificacion}
            onChange={e => setForm({ ...form, identificacion: e.target.value })} required />
          <input type="text" placeholder="Usuario" value={form.usuario}
            onChange={e => setForm({ ...form, usuario: e.target.value })} required />
          <input type="password" placeholder="Contraseña" value={form.contraseña}
            onChange={e => setForm({ ...form, contraseña: e.target.value })} required />
          <select value={form.profesion}
            onChange={e => setForm({ ...form, profesion: e.target.value })} required>
            <option value="">Seleccione profesión</option>
            <option value="Oftalmólogo">Oftalmólogo</option>
            <option value="Otorrinolaringólogo">Otorrinolaringólogo</option>
            <option value="Hematólogo">Hematólogo</option>
            <option value="Ortopedista">Ortopedista</option>
            <option value="Otro">Otro</option>
          </select>
          <input type="text" placeholder="Número de consultorio" value={form.consultorio}
            onChange={e => setForm({ ...form, consultorio: e.target.value })} required />
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

export default FormularioMedico;