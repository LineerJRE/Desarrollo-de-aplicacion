import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalFormularioAdmin from '../components/Administrador/FormularioRegistroAdmin';
import FormularioLoginAdmin from '../components/Administrador/FormularioLoginAdmin';
import Sidebar from '../components/Administrador/Sidebar';
import Navbar from '../components/Administrador/Navbar';
import HomeAdmin from '../components/Administrador/HomeDashboard';
import UsuariosAdmin from '../components/Administrador/UsuariosDashboard';
import AvisoAdmin from '../components/Administrador/AvisoDashboard';
import Catalogo from '../components/Administrador/CatalogoDashboard';

import '../styles/VistaAdministrador.css';

function VistaAdministrador() {
  const [adminExiste, setAdminExiste] = useState(null);
  const [adminAutenticado, setAdminAutenticado] = useState(false);
  const [loginData, setLoginData] = useState({ usuario: '', contraseña: '' });
  const [mensaje, setMensaje] = useState('');
  const [vista, setVista] = useState('home'); // opciones: home, usuarios, aviso
  const [usuarioActual, setUsuarioActual] = useState('');
  const Sesion ="";

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/existe')
      .then(res => setAdminExiste(res.data.existe))
      .catch(err => setMensaje('Error al consultar administrador.'));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', loginData);
      setMensaje(res.data.message);
      setAdminAutenticado(true);
      setUsuarioActual(res.data.usuario || loginData.usuario);
    } catch (err) {
      setMensaje(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  const handleCerrarSesion = () => {
    setAdminAutenticado(false);
    setLoginData({ usuario: '', contraseña: '' });
    setMensaje('');
    setVista('home');
  };

  if (!adminAutenticado) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-container">
          <h2>{adminExiste ? 'Iniciar Sesión de Administrador' : 'Registrar Administrador'}</h2>
          {!adminExiste ? (
            <ModalFormularioAdmin 
              Sesion 
              setAdminExiste={setAdminExiste} 
            />
          ) : (
            <FormularioLoginAdmin
              loginData={loginData}
              setLoginData={setLoginData}
              handleLogin={handleLogin}
              mensaje={mensaje}
            />
          )}
        </div>
      </div>
    );
  }

  const renderVista = () => {
    switch (vista) {
      case 'usuarios':
        return <UsuariosAdmin />;
      case 'catalogo':
        return <Catalogo />;
      case 'aviso':
        return <AvisoAdmin />;
      default:
        return <HomeAdmin setVista={setVista} />;
    }
  };

  return (
    <div className="admin-panel">
      <Sidebar vista={vista} setVista={setVista} />
      <div className="admin-content">
        <Navbar usuario={usuarioActual} onLogout={handleCerrarSesion} />
        <div className="admin-dashboard">
          {renderVista()}
        </div>
      </div>
    </div>
  );
}

export default VistaAdministrador;