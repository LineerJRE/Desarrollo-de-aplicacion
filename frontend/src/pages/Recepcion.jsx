import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import ListaRecepcion from "../components/Recepcion/ListaRecepcion";
import PacienteRecepcion from "../components/Recepcion/PacienteRecepcion";
import AsignacionExamenes from "../components/Recepcion/AsignacionExamenes";
import LoginModalRecepcion from "../components/Recepcion/LoginModalRecepcion";
import Navbar from "../components/Recepcion/Navbar";
import "../styles/Recepcion.css";

const socket = io("http://localhost:5000");

function Recepcion() {
  const [usuarioRecepcion, setUsuarioRecepcion] = useState(() => {
    const guardado = localStorage.getItem("usuarioRecepcion");
    return guardado ? JSON.parse(guardado) : null;
  });
  const [recAutenticado, setRecAutenticado] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [pacienteActual, setPacienteActual] = useState(null);
  const [mostrarExamenes, setMostrarExamenes] = useState(false);
  const [examenesSeleccionados, setExamenesSeleccionados] = useState([]);
  const [mensajeAsignacion, setMensajeAsignacion] = useState("");

  const modulo = usuarioRecepcion?.modulo || "";

  const examenesDisponibles = [
    "Examen de sangre",
    "Examen de la vista",
    "Examen del oído",
    "Examen osteomuscular",
    "Examen osteomuscular",
    "Examen osteomuscular",
    "Examen osteomuscular",
    "Examen osteomuscular",
    "Examen osteomuscular",
    "Examen osteomuscular",
    "Examen de ingreso"
  ];

  useEffect(() => {
    socket.on("turnoAsignado", (nuevoPaciente) => {
      setPacientes((prev) => [...prev, nuevoPaciente].sort((a, b) => a.turno - b.turno));
    });

    if (usuarioRecepcion) {
      obtenerPacientes();
    }

    return () => socket.off();
  }, [usuarioRecepcion]);

  const obtenerPacientes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pacientes");
      const pendientes = res.data.filter((p) => !p.examenes || p.examenes.length === 0);
      setPacientes(pendientes.sort((a, b) => a.turno - b.turno));
    } catch (err) {
      console.error("Error al obtener pacientes:", err);
    }
  };

  const llamarSiguiente = () => {
    if (pacientes.length > 0) {
      const siguiente = pacientes[0];
      setPacienteActual(siguiente);
      setPacientes(pacientes.slice(1));
      setMostrarExamenes(false);
      setExamenesSeleccionados([]);

      socket.emit("pacienteLlamado", {
        turno: siguiente.turno,
        nombre: siguiente.nombre,
        modulo: modulo
      });
    }
  };

  const asignarExamenes = async () => {
    if (!pacienteActual) return;
    try {
      await axios.post(`http://localhost:5000/api/pacientes/${pacienteActual._id}/asignar-examenes`, {
        examenes: examenesSeleccionados,
      });
      setMostrarExamenes(false);
      setMensajeAsignacion("Exámenes asignados correctamente");
      obtenerPacientes();
    } catch (err) {
      console.error("Error al asignar exámenes:", err);
    }
  };

  const toggleExamen = (examen) => {
    setExamenesSeleccionados((prev) =>
      prev.includes(examen) ? prev.filter((e) => e !== examen) : [...prev, examen]
    );
  };

  const actualizarRec = (actualizar) =>{
    setRecAutenticado(actualizar)
  }

  const handleCerrarSesion = () => {
    setRecAutenticado(false);
    setUsuarioRecepcion(null); 
    setPacienteActual(null); 
    setMostrarExamenes(false);  
  };

  if (!recAutenticado) {
    return( 
      <div className="recepcion-login-container">
        <LoginModalRecepcion 
          onLoginSuccess={setUsuarioRecepcion}
          setRecAutenticado={actualizarRec} 
        />;
      </div>
    )
  }

  return (
    <div className="recepcion-container">
      <Navbar usuario={usuarioRecepcion.usuario} onLogout={handleCerrarSesion} />
      <ListaRecepcion pacientes={pacientes} />
      <PacienteRecepcion
        pacienteActual={pacienteActual}
        pacientesRestantes={pacientes}
        llamarSiguiente={llamarSiguiente}
        setMostrarExamenes={setMostrarExamenes}
      />
      <AsignacionExamenes
        mostrar={mostrarExamenes}
        mensaje={mensajeAsignacion}
        examenesDisponibles={examenesDisponibles}
        seleccionados={examenesSeleccionados}
        toggleExamen={toggleExamen}
        asignar={asignarExamenes}
      />
    </div>
  );
}

export default Recepcion;