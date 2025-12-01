import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import RegistroPaciente from '../components/APP/RegistroPaciente';

const socket = io('http://localhost:5000');

function App() {
  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [turnoAsignado, setTurnoAsignado] = useState(null);
  const [error, setError] = useState(null);

  const registrarPaciente = async () => {
    if (!nombre || !documento) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    try {
      setError(null);
      const response = await axios.post('http://localhost:5000/api/pacientes', { nombre, documento });
      setTurnoAsignado(response.data);
    } catch (err) {
      setError("Error al registrar el paciente. Intente nuevamente.");
    }
  };

  const siguienteRegistro = () => {
    setNombre('');
    setDocumento('');
    setTurnoAsignado(null);
    setError(null);
  };

  useEffect(() => {
    socket.on('turnoAsignado', (paciente) => {
      setTurnoAsignado(paciente);
    });
    return () => socket.off('turnoAsignado');
  }, []);

  return (
    <RegistroPaciente
      nombre={nombre}
      setNombre={setNombre}
      documento={documento}
      setDocumento={setDocumento}
      turnoAsignado={turnoAsignado}
      registrarPaciente={registrarPaciente}
      siguienteRegistro={siguienteRegistro}
      error={error}
    />
  );
}

export default App;