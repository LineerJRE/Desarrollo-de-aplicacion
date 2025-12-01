const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  nombreCompleto: String,
  identificacion: String,
  usuario: String,
  contraseña: String,
});

// Hashear contraseña antes de guardar
adminSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  this.contraseña = await bcrypt.hash(this.contraseña, 10);
  next();
});

// Validar contraseña ingresada
adminSchema.methods.validarContraseña = async function (input) {
  return await bcrypt.compare(input, this.contraseña);
};

module.exports = mongoose.model('Admin', adminSchema);