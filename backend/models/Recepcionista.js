const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const recepcionistaSchema = new mongoose.Schema({
  nombre: String,
  identificacion: String,
  usuario: String,
  contraseña: String,
  modulo: String,
});

// Hashear contraseña antes de guardar
recepcionistaSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  this.contraseña = await bcrypt.hash(this.contraseña, 10);
  next();
});

// Validar contraseña ingresada
recepcionistaSchema.methods.validarContraseña = async function (input) {
  return await bcrypt.compare(input, this.contraseña);
};

module.exports = mongoose.model('Recepcionista', recepcionistaSchema);