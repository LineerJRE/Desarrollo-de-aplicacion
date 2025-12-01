import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/App';
import Recepcion from './pages/Recepcion';
import Pantalla from './pages/Pantalla_llamados';
import Medico from './pages/Vista_medico';
import Administrador from './pages/Administrador';
import './styles/Index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recepcion" element={<Recepcion />} />
        <Route path="/pantalla" element={<Pantalla />} />
        <Route path="/medico" element={<Medico />} />
        <Route path="/admin" element={<Administrador />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);