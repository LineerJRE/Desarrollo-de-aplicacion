import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaKey, FaTrash } from 'react-icons/fa';
import FormularioMedico from './FMedico';
import FormularioRecepcionista from './FRecepcionista';
import ModalEditarUsuario from './ModalEditarUsuario';
import ModalCambiarClave from './ModalCambiarClave';
import ModalConfirmacion from './ModalConfirmacion';
import ModalNotificacion from './ModalNotificacion';
import ModalFormularioAdmin from './FormularioRegistroAdmin';
import '../../styles/UsuariosDashboard.css';

function UsuariosDashboard() {
  const [medicos, setMedicos] = useState([]);
  const [recepcionistas, setRecepcionistas] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [modal, setModal] = useState(null);
  const [modalEditar, setModalEditar] = useState(null);
  const [modalClave, setModalClave] = useState(null);
  const [modalConfirmacion, setModalConfirmacion] = useState(null);
  const [notificacion, setNotificacion] = useState(null);

  const fetchData = async () => {
    try {
      const resM = await axios.get('http://localhost:5000/api/medicos/obtener');
      const resR = await axios.get('http://localhost:5000/api/recepcionistas/obtener');
      const resA = await axios.get('http://localhost:5000/api/admin/obtener');
      setMedicos(resM.data);
      setRecepcionistas(resR.data);
      setAdmin(resA.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const editarUsuario = (usuario) => setModalEditar(usuario);
  const cambiarClave = (usuario) => setModalClave(usuario);

  const eliminarUsuario = async () => {
  const usuario = modalConfirmacion;
  try {
    const url = `http://localhost:5000/api/${usuario.tipo}/eliminar/${usuario._id}`;

    await axios.delete(url);
    setModalConfirmacion(null);
    fetchData();
    setNotificacion({ mensaje: 'Usuario eliminado correctamente', tipo: 'success' });
  } catch (error) {
    console.error(error);
    setModalConfirmacion(null);
    setNotificacion({ mensaje: 'Error al eliminar usuario', tipo: 'error' });
  }
};

  const guardarEdicion = async (usuarioEditado) => {
    const ruta = `http://localhost:5000/api/${usuarioEditado.tipo}/actualizar/${usuarioEditado._id}`;
    await axios.put(ruta, usuarioEditado);
    setModalEditar(null);
    fetchData();
  };

  const guardarClave = async (usuario, nuevaClave) => {
    const ruta = `http://localhost:5000/api/${usuario.tipo}/clave/${usuario._id}`;
    await axios.put(ruta, { contraseña: nuevaClave });
    setModalClave(null);
    fetchData();
  };

  return (
  <div className="usuarios-dashboard">
    <h2>Usuarios Médicos</h2>
    <button className="boton-crear" onClick={() => setModal('medico')}>CREAR MEDICO</button>
    <table className="tabla-usuarios">
      <thead>
        <tr>
          <th>NOMBRE</th>
          <th>IDENTIFICACIÓN</th>
          <th>USUARIO</th>
          <th>PROFESIÓN</th>
          <th>CONSULTORIO</th>
          <th>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        {medicos.map(m => (
          <tr key={m._id}>
            <td>{m.nombre}</td>
            <td>{m.identificacion}</td>
            <td>{m.usuario}</td>
            <td>{m.profesion}</td>
            <td>{m.consultorio}</td>
            <td>
              <button className="boton-accion" onClick={() => editarUsuario({ ...m, tipo: 'medicos' })} title="Editar datos">✏️</button>
              <button className="boton-accion" onClick={() => cambiarClave({ ...m, tipo: 'medicos' })} title="Cambiar contraseña">🔒</button>
             <button className="boton-accion" onClick={() => setModalConfirmacion({ ...m, tipo: 'medicos' })} title="Eliminar">🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <h2>Usuarios Recepcionistas</h2>
    <button onClick={() => setModal('recepcionista')}>CREAR RECEPCIONISTA</button>
    <table className="tabla-usuarios">
      <thead>
        <tr>
          <th>NOMBRE</th>
          <th>IDENTIFICACIÓN</th>
          <th>USUARIO</th>
          <th>MÓDULO</th>
          <th>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        {recepcionistas.map(r => (
          <tr key={r._id}>
            <td>{r.nombre}</td>
            <td>{r.identificacion}</td>
            <td>{r.usuario}</td>
            <td>{r.modulo}</td>
            <td>
              <button className="boton-accion" onClick={() => editarUsuario({ ...r, tipo: 'recepcionistas' })} title="Editar datos">✏️</button>
              <button className="boton-accion" onClick={() => cambiarClave({ ...r, tipo: 'recepcionistas' })} title="Cambiar contraseña">🔒</button>
              <button className="boton-accion" onClick={() => setModalConfirmacion({ ...r, tipo: 'recepcionistas' })} title="Eliminar">🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <h2>Usuarios Administradores</h2>
    <button onClick={() => setModal('admin')}>CREAR ADMINISTRADOR</button>
    <table className="tabla-usuarios">
      <thead>
        <tr>
          <th>NOMBRE</th>
          <th>IDENTIFICACIÓN</th>
          <th>USUARIO</th>
          <th>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        {admin.map(a => (
          <tr key={a._id}>
            <td>{a.nombreCompleto}</td>
            <td>{a.identificacion}</td>
            <td>{a.usuario}</td>
            <td>
              <button className="boton-accion" onClick={() => editarUsuario({ ...a, tipo: 'admin' })} title="Editar datos">✏️</button>
              <button className="boton-accion" onClick={() => cambiarClave({ ...a, tipo: 'admin' })} title="Cambiar contraseña">🔒</button>
              <button className="boton-accion" onClick={() => setModalConfirmacion({ ...a, tipo: 'admin' })} title="Eliminar">🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {modal === 'medico' && (
      <FormularioMedico onClose={() => { setModal(null); fetchData(); }} />
    )}

    {modal === 'recepcionista' && (
      <FormularioRecepcionista onClose={() => { setModal(null); fetchData(); }} />
    )}

    {modal === 'admin' && (
      <ModalFormularioAdmin onClose={() => { setModal(null); fetchData(); }} />
    )}

    {modalEditar && (
      <ModalEditarUsuario
        usuario={modalEditar}
        onClose={() => setModalEditar(null)}
        onSave={guardarEdicion}
      />
    )}

    {modalClave && (
      <ModalCambiarClave
        usuario={modalClave}
        onClose={() => setModalClave(null)}
        onSave={guardarClave}
      />
    )}

    {modalConfirmacion && (
      <ModalConfirmacion
        mensaje={`¿Estás seguro de eliminar a ${modalConfirmacion.nombre}?`}
        onConfirm={eliminarUsuario}
        onCancel={() => setModalConfirmacion(null)}
      />
    )}

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

export default UsuariosDashboard;