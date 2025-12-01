const express = require('express');
const router = express.Router();
const profesionController = require('../controllers/profesionController');

// Registrar nueva profesion
router.post('/registrar', profesionController.registrarProfesion);

// Obtener todos las profesiones
router.get('/obtener', profesionController.obtenerProfesion);

// Actualizar datos
router.put('/actualizar/:id', profesionController.actualizarProfesion);

//Eliminar examen
router.delete('/eliminar/:id', profesionController.eliminarProfesion);

module.exports = router;