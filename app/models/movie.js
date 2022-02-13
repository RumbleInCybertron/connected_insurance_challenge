const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  _director: { type: mongoose.Types.ObjectId, ref: 'Director'},
  name: String,
  releaseYear: Number,
})

const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie