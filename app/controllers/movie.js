const mongoose = require("mongoose");
const Director = require("../models/director.js");
const Movie = require("../models/movie.js");

// Create a Movie in the database.
const createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    if (req.body.newDirector) {
      const director = await new Director({
        firstName: req.body.newDirectorFirstName,
        lastName: req.body.newDirectorLastName,
        movies: [movie._id]
      }).save();
      movie._director = director._id;
    } else {
      const director = await Director.findById(req.body._director);
      // console.log(req.body._director);
      if (!director) return res.status(500).send("Director not found");
      movie._director = director._id;
      // director.movies.push(movie._id);
    }

    await movie.save();
    // console.log(movie);
    res.json(movie);
  } catch (error) {
    res
      .status(500)
      .send(error.message || "Some error occurred while creating the Movie.");
  }
};

// Retrieve all Movies from the database.
const getMovies = async (_req, res) => {
  try {
    console.log(await Movie.find({}));
    const movies = await Movie.find({}).populate(
      "_director",
      "firstName lastName"
    );
    res.send(movies);
  } catch (error) {
    await res.status(500).json({
      message: error.message || "Some error occurred while getting all movies.",
    });
  }
};

// Find a single Movie with an id
const getMovie = async (req, res) => {
  try {
    const data = await Movie.findById(req.params.id).populate(
      "_director",
      "firstName lastName"
    );
    if (!data)
      res
        .status(404)
        .send("Movie not found with id " + req.params.id.toString());
    else res.send(data);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Error retrieving Movie with id=" + req.params.id,
    });
  }
};

// // Update a Movie by the id in the request
// exports.update = (req, res) => {
//     if (!req.body) {
//       return res.status(400).send({
//         message: "Data to update can not be empty!"
//       });
//     }
//     const id = req.params.id;
//     Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//       .then(data => {
//         if (!data) {
//           res.status(404).send({
//             message: `Cannot update Movie with id=${id}. Maybe Movie was not found!`
//           });
//         } else res.send({ message: "Movie was updated successfully." });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Movie with id=" + id
//         });
//       });
// };

// // Delete a Movie with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;
//     Movie.findByIdAndRemove(id)
//       .then(data => {
//         if (!data) {
//           res.status(404).send({
//             message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`
//           });
//         } else {
//           res.send({
//             message: "Movie was deleted successfully!"
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete Movie with id=" + id
//         });
//       });
//   };

module.exports = { getMovies, getMovie, createMovie };
