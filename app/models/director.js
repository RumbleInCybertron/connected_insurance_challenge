const mongoose = require('mongoose');

const DirectorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  movies: [{ type: mongoose.Types.ObjectId, ref: 'Movie'}]
})

const Director = mongoose.model('Director', DirectorSchema)

module.exports = Director