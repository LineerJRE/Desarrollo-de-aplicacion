const Paciente = require('../models/Paciente');
const moment = require('moment');

// Obtener el último turno del día
const obtenerUltimoTurno = async () => {
  const hoy = moment().startOf('day');
  const paciente = await Paciente.findOne({ fechaRegistro: { $gte: hoy.toDate() } })
    .sort({ turno: -1 })
    .limit(1);
  return paciente ? paciente.turno : 0;
};

// Registrar paciente
exports.registrarPaciente = async (req, res) => {
  const { nombre, documento } = req.body;

  try {
    const ultimoTurno = await obtenerUltimoTurno();
    const turno = ultimoTurno + 1;
    const consultorio = 'Consultorio 1'; // Consultorio fijo por ahora

    const paciente = new Paciente({ nombre, documento, turno, consultorio });
    await paciente.save();

    // Emitir por WebSocket si se configuró en server.js
    req.io?.emit('turnoAsignado', paciente);

    res.status(201).json(paciente);
  } catch (error) {
    console.error('Error al registrar paciente:', error);
    res.status(500).json({ message: 'Error al registrar paciente' });
  }
};

// Asignar exámenes a paciente
exports.asignarExamenes = async (req, res) => {
  const { id } = req.params;
  const { examenes } = req.body;

  try {
    const paciente = await Paciente.findById(id);
    if (!paciente) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    paciente.examenes = examenes;
    await paciente.save();

     // Emitir evento por socket para notificar a vistas conectadas
     req.io.emit('pacienteConExamenes', paciente);

    res.status(200).json(paciente);
  } catch (error) {
    console.error('Error al asignar exámenes:', error);
    res.status(500).json({ message: 'Error al asignar exámenes' });
  }
};

// Obtener todos los pacientes
exports.obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.find();
  res.json(pacientes);
};

// Obtener pacientes con exámenes
exports.obtenerConExamenes = async (req, res) => {
  const pacientes = await Paciente.find({ examenes: { $exists: true, $not: { $size: 0 } } });
  res.json(pacientes);
};