import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormularioProfesion from './Fprofesion';
import FormularioExamen from './Fexamen';
import ModalEditarItem from './ModalEditarItem';
import ModalConfirmacion from './ModalConfirmacion';
import ModalNotificacion from './ModalNotificacion';
import '../../styles/UsuariosDashboard.css';

function CatalogoDashboard() {
  const [examenes, setExamenes] = useState([]);
  const [profesion, setProfesion] = useState([]);
  const [modal, setModal] = useState(null);
  const [modalEditar, setModalEditar] = useState(null);
  const [modalConfirmacion, setModalConfirmacion] = useState(null);
  const [notificacion, setNotificacion] = useState(null);
  const [campo, setCampo] = useState(null);

  const fetchData = async () => {
    try {
      const resE = await axios.get('http://localhost:5000/api/examen/obtener');
      const resP = await axios.get('http://localhost:5000/api/profesion/obtener');
      setExamenes(resE.data);
      setProfesion(resP.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const editarItem = (item) => setModalEditar(item);
  const itemConfirmacion = (item) =>{
    if (item.tipo=="examen") {
      setCampo(item.examen);
    }else{
      setCampo(item.profesion)
    }
    setModalConfirmacion(item)
  };

  const eliminarItem = async () => {
  const item = modalConfirmacion;
  try {
    const url = `http://localhost:5000/api/${item.tipo}/eliminar/${item._id}`;
    await axios.delete(url);
    setModalConfirmacion(null);
    fetchData();
    setNotificacion({ mensaje: 'Item eliminado correctamente', tipo: 'success' });
  } catch (error) {
    console.error(error);
    setModalConfirmacion(null);
    setNotificacion({ mensaje: 'Error al eliminar item', tipo: 'error' });
  }
};

  const guardarEdicion = async (itemEditado) => {
    const ruta = `http://localhost:5000/api/${itemEditado.tipo}/actualizar/${itemEditado._id}`;
    await axios.put(ruta, itemEditado);
    setModalEditar(null);
    fetchData();
  };

  return (
  <div className="usuarios-dashboard">
    <h2>Profesiones</h2>
    <button className="boton-crear" onClick={() => setModal('profesion')}>CREAR PROFESION</button>
    <table className="tabla-usuarios">
      <thead>
        <tr>
          <th>PROFESION</th>
          <th>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        {profesion.map(p => (
          <tr key={p._id}>
            <td>{p.profesion}</td>
            <td>
              <button className="boton-accion" onClick={() => editarItem({ ...p, tipo: 'profesion' })} title="Editar datos">✏️</button>
             <button className="boton-accion" onClick={() => itemConfirmacion({ ...p, tipo: 'profesion' })} title="Eliminar">🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <h2>Examenes</h2>
    <button onClick={() => setModal('examen')}>CREAR EXAMENES</button>
    <table className="tabla-usuarios">
      <thead>
        <tr>
          <th>EXAMEN</th>
          <th>PROFESION</th>
          <th>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        {examenes.map(e => (
          <tr key={e._id}>
            <td>{e.examen}</td>
            <td>{e.profesion}</td>
            <td>
              <button className="boton-accion" onClick={() => editarItem({ ...e, tipo: 'examen' })} title="Editar datos">✏️</button>
              <button className="boton-accion" onClick={() => itemConfirmacion({ ...e, tipo: 'examen' })} title="Eliminar">🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {modal === 'profesion' && (
      <FormularioProfesion onClose={() => { setModal(null); fetchData(); }} />
    )}

    {modal === 'examen' && (
      <FormularioExamen 
        onClose={() => { setModal(null); fetchData();}}
        DatoProfesion={profesion}
      />
    )}

    {modalEditar && (
      <ModalEditarItem
        item={modalEditar}
        onClose={() => setModalEditar(null)}
        onSave={guardarEdicion}
        DatoProfesion={profesion}
      />
    )}

    {modalConfirmacion && (
      <ModalConfirmacion
        mensaje={`¿Estás seguro de eliminar a ${campo}?`}
        onConfirm={eliminarItem}
        onCancel={() => setModalConfirmacion(null) }
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

export default CatalogoDashboard;