import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import PantallaCompleta from '../components/Pantalla/PantallaCompleta';
import ListaLlamados from '../components/Pantalla/ListaLlamados';
import NavbarPantalla from "../components/Pantalla/NavbarPantalla"
import '../styles/PantallaLlamados.css';

const socket = io('http://localhost:5000');

function PantallaLlamados() {
  const [ultimosLlamados, setUltimosLlamados] = useState([]);
  const [pacienteLlamado, setPacienteLlamado] = useState(null);
  const [mostrarPantallaCompleta, setMostrarPantallaCompleta] = useState(false);

  useEffect(() => {
    socket.on('nuevoLlamado', (data) => {
      setUltimosLlamados(prevLlamados => {
        const nuevosLlamados = [data, ...prevLlamados];
        if (nuevosLlamados.length > 4) nuevosLlamados.pop();
        return nuevosLlamados;
      });

      setPacienteLlamado(data);
      setMostrarPantallaCompleta(true);
      setTimeout(() => {
        setMostrarPantallaCompleta(false);
      }, 3000);
    });

    return () => {
      socket.off('nuevoLlamado');
    };
  }, []);

  return (
    <div className="pantalla-container">
      {mostrarPantallaCompleta && pacienteLlamado && <PantallaCompleta paciente={pacienteLlamado} />}
      <NavbarPantalla/>
      <ListaLlamados ultimosLlamados={ultimosLlamados} />
    </div>
  );
}

export default PantallaLlamados;