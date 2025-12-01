const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');

// Crear nuevo médico
router.post('/', medicoController.crearMedico);

// Login médico
router.post('/login', medicoController.loginMedico);

// Obtener todos los médicos
router.get('/obtener', medicoController.obtenerMedicos);

// Actualizar datos (sin contraseña)
router.put('/actualizar/:id', medicoController.actualizarDatosMedico);

// Cambiar contraseña
router.put('/clave/:id', medicoController.cambiarClaveMedico);

//Eliminar médico
router.delete('/eliminar/:id', medicoController.eliminarMedico);

module.exports = router;