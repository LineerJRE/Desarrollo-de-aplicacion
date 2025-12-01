const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nombre: String,
  documento: String,
  turno: Number,
  consultorio: String,
  atencion:Boolean,
  fechaRegistro: { type: Date, default: Date.now },
  examenes: [{ type: String }]
});

module.exports = mongoose.model('Paciente', pacienteSchema);