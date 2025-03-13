const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  ocupacion: String
});

module.exports = mongoose.model('Usuario', usuarioSchema);
