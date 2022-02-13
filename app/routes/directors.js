const express = require('express');
const router = express.Router();
const {
  createDirector,
  getDirectors,
  getDirector,
} = require('../controllers/director.js');

router.post('/', createDirector);
router.get('/', getDirectors);
router.get('/:id', getDirector);

module.exports = router;