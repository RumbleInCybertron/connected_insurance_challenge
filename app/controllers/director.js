const Director = require("../models/director.js");

// Create a Director in the database.
const createDirector = async (req, res) => {
  try {
    const newDirector = await Director.create(req.body);
    res.json(newDirector);
  } catch (error) {
    res.json({ message: error.message || "Director could not be created" });
  }
};

// Retrieve all Director from the database.
const getDirectors = async (req, res) => {
  try {
    const directors = await Director.find({}).populate(
      "movies",
      "name releaseYear"
    );
    res.send(directors);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Some error occurred while getting all directors.",
    });
  }
};

// Find a single Director with an id
const getDirector = async (req, res) => {
  try {
    const data = await Director.findById(req.params.id).populate(
      "movies",
      "name releaseYear"
    );
    if (!data)
      res.status(404).send({
        message: "Director not found with id " + req.params.id.toString(),
      });
    else res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Error retrieving Director with id=" + req.params.id,
    });
  }
};

module.exports = { createDirector, getDirectors, getDirector };
