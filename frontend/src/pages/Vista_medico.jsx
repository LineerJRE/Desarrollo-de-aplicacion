import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ListaPacientes from '../components/Medico/ListaPacientes';
import PacienteAtencion from '../components/Medico/PacienteAtencion';
import LoginMedico from '../components/Medico/LoginMedico';
import Navbar from '../components/Medico/Navbar';
import '../styles/VistaMedico.css';

function VistaMedico() {
  const [usuarioMedico, setUsuarioMedico] = useState(() => {
      const guardado = localStorage.getItem("usuarioMedico");
      return guardado ? JSON.parse(guardado) : null;
    });
  const [medicoAutenticado, setMedicoAutenticado] = useState(false);
  const [socket, setSocket] = useState(null);
  const [pacientesConExamenes, setPacientesConExamenes] = useState([]);
  const [pacienteActual, setPacienteActual] = useState(null);
  const consultorio = usuarioMedico?.consultorio || "";

  useEffect(() => {
    const socketInstance = io('http://localhost:5000');
    setSocket(socketInstance);

    fetch('http://localhost:5000/api/pacientes/con-examenes')
      .then(res => res.json())
      .then(data => {
        const ordenados = data.sort((a, b) => a.turno - b.turno);
        setPacientesConExamenes(ordenados);
      });

    socketInstance.on('pacienteConExamenes', (paciente) => {
      setPacientesConExamenes(prev =>
        [...prev, paciente].sort((a, b) => a.turno - b.turno)
      );
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const manejarSiguiente = () => {
    if (pacientesConExamenes.length === 0) {
      setPacienteActual(null);
      return;
    }

    const siguiente = pacientesConExamenes[0];
    setPacienteActual(siguiente);
    setPacientesConExamenes(prev => prev.slice(1));

    if (socket) {
      socket.emit('pacienteLlamado', {
        turno: siguiente.turno,
        nombre: siguiente.nombre,
        consultorio: consultorio
      });
    }
  };

  const actualizaMedico = (actualizado) => {
    setMedicoAutenticado(actualizado)
  }

  const handleCerrarSesion = () => {
    setMedicoAutenticado(false);
    setUsuarioMedico(null);
    setPacienteActual(null);    
  };

  if (!medicoAutenticado) {
    return (
      <div className="medico-login-container" >
        <LoginMedico 
          onLoginSuccess={setUsuarioMedico} 
          setMedicoAutenticado={actualizaMedico}
        />
      </div>
    );
  }

  return (
    <div className="vista-medico-container">
      <Navbar usuario={usuarioMedico.usuario} onLogout={handleCerrarSesion}/>
      <ListaPacientes pacientes={pacientesConExamenes} />
      <PacienteAtencion
        pacienteActual={pacienteActual}
        manejarSiguiente={manejarSiguiente}
        numeroConsultorio={consultorio}
      />
    </div>
  );
}

export default VistaMedico;