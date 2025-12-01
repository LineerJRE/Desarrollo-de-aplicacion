import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/FormulariosModal.css';
import ModalNotificacion from './ModalNotificacion';
import { form } from 'framer-motion/client';

function FormularioRegistroAdmin({onClose, Sesion, setAdminExiste }) {
    const [formData, setFormData] = useState({
      nombreCompleto: '',
      identificacion: '',
      usuario: '', 
      contraseña: '', 
      confirmarContraseña: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [notificacion, setNotificacion] = useState(null);
    
    const isSesion = !!Sesion;

    const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/registrar', formData);
      setFormData({
        nombreCompleto: '',
        identificacion: '',
        usuario: '', 
        contraseña: '', 
        confirmarContraseña: ''
      });
      setNotificacion({ mensaje: 'Administrador creado con éxito', tipo: 'success' });
      setAdminExiste(true);
    } catch (err) {
      console.error(error);
      setNotificacion({ mensaje: 'Error al crear usuario administrador', tipo: 'error' });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {isSesion?(<></>):(<button className="modal-close" onClick={onClose}>×</button>)}
        <h3>Crear Usuario</h3>
        {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
          <form onSubmit={handleRegistro}>
            <input type="text" placeholder="Nombre completo" value={formData.nombreCompleto}
              onChange={e => setFormData({ ...formData, nombreCompleto: e.target.value })} required />
            <input type="text" placeholder="Identificación" value={formData.identificacion}
              onChange={e => setFormData({ ...formData, identificacion: e.target.value })} required />
            <input type="text" placeholder="Usuario" value={formData.usuario}
              onChange={e => setFormData({ ...formData, usuario: e.target.value })} required />
            <input type="password" placeholder="Contraseña" value={formData.contraseña}
              onChange={e => setFormData({ ...formData, contraseña: e.target.value })} required />
            <input type="password" placeholder="Confirmar contraseña" value={formData.confirmarContraseña}
              onChange={e => setFormData({ ...formData, confirmarContraseña: e.target.value })} required />
            {isSesion?(
              <button type="submit"> REGISTRAR </button>
              ):(
                <>
                <button type="submit">REGISTRAR</button>
                <button type="button" onClick={onClose}>CANCELAR</button>
              </>
              )}
            
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

export default FormularioRegistroAdmin;