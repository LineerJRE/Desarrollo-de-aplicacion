import React, { useState } from 'react';
import '../../styles/Modal.css';

function ModalEditarItem({ item, onClose, onSave, DatoProfesion }) {
    const [examen, setExamen] = useState(item.examen || '');
    const [profesion, setProfesion] = useState(item.profesion);

    const isExamen = !!item.examen;
    
    const handleSubmit = (e) => {
    e.preventDefault();
    const datos = {
      _id: item._id,
      profesion,
      tipo: isExamen ? 'examen' : 'profesion', // 👉 necesario para dashboard
    };

    if (isExamen) {
      datos.examen = examen;
    }

    onSave(datos); // llama a guardarEdicion en UsuariosDashboard
  };

  return (
    <div className="modal">
        <div className="modal-contenido">
            {isExamen?(<h3>Editar Examen</h3>):(<h3>Editar Profesion</h3>)}
            <form onSubmit={handleSubmit}>
                {isExamen?(
                    <>
                        <label>Examen:
                            <input value={examen} onChange={(e) => setExamen(e.target.value)} required />
                        </label>
                        <select value={profesion}
                            onChange={e => setProfesion(e.target.value)} required>
                            <option value="">Seleccione profesión</option>
                            {DatoProfesion.map((dato, index) => (
                            <option key={index} value={dato.profesion}>
                            {dato.profesion}
                            </option>
                            ))}
                        </select>
                    </>
                ) : (
                    <>
                        <label>Profesion:
                            <input value={profesion} onChange={(e) => setProfesion(e.target.value)} required />
                        </label>
                    </>
                )}
                
                <div className="modal-botones">
                    <button type="submit">GUARDAR</button>
                    <button type="button" onClick={onClose} className="cancelar">CANCELAR</button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default ModalEditarItem;