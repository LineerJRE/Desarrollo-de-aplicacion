const express = require('express');
const router = express.Router();
const examenController = require('../controllers/examenController');

// Registrar nuevo examen
router.post('/registrar', examenController.registrarExamen);

// Obtener todos los examenes
router.get('/obtener', examenController.obtenerExamen);

// Actualizar datos
router.put('/actualizar/:id', examenController.actualizarExamen);

//Eliminar examen
router.delete('/eliminar/:id', examenController.eliminarExamen);

module.exports = router;