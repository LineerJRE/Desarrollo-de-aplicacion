const mongoose = require('mongoose');

const examenesSchema = new mongoose.Schema({
  examen: String,
  profesion: String,
});

module.exports = mongoose.model('Examen', examenesSchema);