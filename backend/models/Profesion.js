const mongoose = require('mongoose');

const profesionSchema = new mongoose.Schema({
  profesion: String,
});

module.exports = mongoose.model('Profesion', profesionSchema);