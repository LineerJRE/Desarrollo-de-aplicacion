const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const medicoSchema = new mongoose.Schema({
  nombre: String,
  identificacion: String,
  usuario: String,
  contraseña: String,
  profesion: String,
  consultorio: String,
});

// Hashear contraseña antes de guardar
medicoSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  this.contraseña = await bcrypt.hash(this.contraseña, 10);
  next();
});

// Validar contraseña ingresada
medicoSchema.methods.validarContraseña = async function (input) {
  return await bcrypt.compare(input, this.contraseña);
};

module.exports = mongoose.model('Medico', medicoSchema);