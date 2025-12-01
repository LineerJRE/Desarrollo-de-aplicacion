import React, { useState } from 'react';
import axios from 'axios';
import ModalNotificacion from './ModalNotificacion';
import '../../styles/FormulariosModal.css';

function FormularioRecepcionista({ onClose }) {
  const [form, setForm] = useState({
    nombre: '',
    identificacion: '',
    usuario: '',
    contraseña: '',
    modulo: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [notificacion, setNotificacion] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/recepcionistas', form);
      setForm({ nombre: '', identificacion: '', usuario: '', contraseña: '', modulo: '' });
      setNotificacion({ mensaje: 'Recepcionista creado con éxito', tipo: 'success' });
    } catch (err) {
      console.error(err);
      setNotificacion({ mensaje: 'Error al crear usuario de recepción', tipo: 'error' });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h3>Crear Usuario de Recepción</h3>
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
          <input type="text" placeholder="Módulo" value={form.modulo}
            onChange={e => setForm({ ...form, modulo: e.target.value })} required />
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

export default FormularioRecepcionista;