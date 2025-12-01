const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Verificar si ya hay un admin
router.get('/existe', adminController.verificarExistenciaAdmin);

// Registrar nuevo admin
router.post('/registrar', adminController.registrarAdmin);

// Login
router.post('/login', adminController.loginAdmin);

// Obtener todos los admin
router.get('/obtener', adminController.obtenerAdmin);

// Actualizar datos (sin contraseña)
router.put('/actualizar/:id', adminController.actualizarDatosAdmin);

// Cambiar contraseña
router.put('/clave/:id', adminController.cambiarClaveAdmin);

//Eliminar admin
router.delete('/eliminar/:id', adminController.eliminarAdmin);

module.exports = router;