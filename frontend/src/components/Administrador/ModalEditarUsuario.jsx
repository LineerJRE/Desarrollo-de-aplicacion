import React, { useState } from 'react';
import '../../styles/Modal.css';

function ModalEditarUsuario({ usuario, onClose, onSave }) {
  const [nombre, setNombre] = useState(usuario.nombre);
  const [nombreCompleto, setNombreCompleto] = useState(usuario.nombreCompleto || '');
  const [identificacion, setIdentificacion] = useState(usuario.identificacion);
  const [user, setUser] = useState(usuario.usuario);
  const [profesion, setProfesion] = useState(usuario.profesion || '');
  const [consultorio, setConsultorio] = useState(usuario.consultorio || '');
  const [modulo, setModulo] = useState(usuario.modulo || '');

  const isMedico = !!usuario.profesion;
  const isRecepcion = !!usuario.modulo;
  const isAdmin = !!usuario.nombreCompleto;

  const handleSubmit = (e) => {
    e.preventDefault();

    const datos = {
      _id: usuario._id,
      identificacion,
      tipo: isMedico ? 'medicos' : isRecepcion ? 'recepcionistas' : 'admin', // 👉 necesario para dashboard
    };

    if (isMedico) {
      datos.nombre = nombre;
      datos.profesion = profesion;
      datos.consultorio = consultorio;
      datos.usuario = user;
    } else {
      if (isRecepcion) {
        datos.nombre = nombre;
        datos.modulo = modulo;
        datos.usuario = user;
      } else {
        datos.nombreCompleto = nombreCompleto;
        datos.usuario = user;
      }
    }

    onSave(datos); // llama a guardarEdicion en UsuariosDashboard
  };

  return (
    <div className="modal">
      <div className="modal-contenido">
        <h3>Editar Usuario</h3>
        <form onSubmit={handleSubmit}>
          {isAdmin?(
            <>
            <label>Nombre:
              <input value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} required />
            </label>
            </>
          ) : (
            <>
            <label>Nombre:
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </label>
            </>
          )}
          <label>identificacion:
            <input value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} required />
          </label>
          <label>Usuario:
            <input value={user} onChange={(e) => setUser(e.target.value)} required />
          </label>
          {isMedico ? (
            <>
              <label>Profesión:
                <input value={profesion} onChange={(e) => setProfesion(e.target.value)} required />
              </label>
              <label>Consultorio:
                <input value={consultorio} onChange={(e) => setConsultorio(e.target.value)} required />
              </label>
            </>
          ) : (<></>)}
          {isRecepcion ? (
            <>
              <label>Módulo:
                <input value={modulo} onChange={(e) => setModulo(e.target.value)} required />
              </label>
            </>
          ) : (<></>)}
          <div className="modal-botones">
            <button type="submit">GUARDAR</button>
            <button type="button" onClick={onClose} className="cancelar">CANCELAR</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditarUsuario;