const express = require('express');
const router = express.Router();
const {
  createMovie,
  getMovies,
  getMovie,
  // updateMovie,
  // deleteMovie,
} = require('../controllers/movie.js');

// router.post('/', createDirector);
router.post('/', createMovie);
router.get('/', getMovies);
router.get('/:id', getMovie);
// router.put('/:id', updateMovie);
// router.delete('/:id', deleteMovie);

module.exports = router;