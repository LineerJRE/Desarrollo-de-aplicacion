const express = require('express');
const router = express.Router();
const recepcionistaController = require('../controllers/recepcionistaController');

// Crear nuevo recepcionista
router.post('/', recepcionistaController.crearRecepcionista);

// Login de recepcionista
router.post('/login', recepcionistaController.loginRecepcionista);

// Obtener todos los recepcionistas
router.get('/obtener', recepcionistaController.obtenerRecepcionistas);

// Actualizar datos (sin contraseña)
router.put('/actualizar/:id', recepcionistaController.actualizarDatosRecepcionista);

// Cambiar contraseña
router.put('/clave/:id', recepcionistaController.cambiarClaveRecepcionista);

//Eliminar recepcionista
router.delete('/eliminar/:id', recepcionistaController.eliminarRecepcionista);

module.exports = router;