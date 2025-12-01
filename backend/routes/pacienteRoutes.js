const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// Registrar nuevo paciente
router.post('/', pacienteController.registrarPaciente);

// Asignar exámenes a paciente
router.post('/:id/asignar-examenes', pacienteController.asignarExamenes);

// Obtener todos los pacientes
router.get('/', pacienteController.obtenerPacientes);

// Obtener pacientes con exámenes asignados
router.get('/con-examenes', pacienteController.obtenerConExamenes);

module.exports = router;