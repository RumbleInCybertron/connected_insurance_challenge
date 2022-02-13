import React, { Component } from "react";
import MovieDataService from "../services/movie.service";
import { Link } from "react-router-dom";
export default class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveMovies = this.retrieveMovies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMovie = this.setActiveMovie.bind(this);
    this.removeAllMovies = this.removeAllMovies.bind(this);
    this.searchName = this.searchName.bind(this);
    this.state = {
      movies: [],
      currentMovie: null,
      currentIndex: -1,
      searchName: ""
    };
  }
  componentDidMount() {
    this.retrieveMovies();
  }
  onChangeSearchName(e) {
    const searchName = e.target.value;
    this.setState({
      searchName: searchName
    });
  }
  retrieveMovies() {
    MovieDataService.getAll()
      .then(response => {
        this.setState({
          movies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveMovies();
    this.setState({
      currentMovie: null,
      currentIndex: -1
    });
  }
  setActiveMovie(movie, index) {
    this.setState({
      currentMovie: movie,
      currentIndex: index
    });
  }
  removeAllMovies() {
    MovieDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchName() {
    MovieDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          movies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { searchName, movies, currentMovie, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Movies List</h4>
          <ul className="list-group">
            {movies &&
              movies.map((movie, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveMovie(movie, index)}
                  key={index}
                >
                  {movie.name}
                </li>
              ))}
          </ul>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllMovies}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentMovie ? (
            <div>
              <h4>Movie</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentMovie.name}
              </div>
              <div>
                <label>
                  <strong>Release Year:</strong>
                </label>{" "}
                {currentMovie.releaseYear}
              </div>
              <Link
                to={"/movies/" + currentMovie.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Movie...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
