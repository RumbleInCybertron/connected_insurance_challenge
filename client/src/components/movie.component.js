import React, { Component } from "react";
import MovieDataService from "../services/movie.service";
export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeReleaseYear = this.onChangeReleaseYear.bind(this);
    this.getMovie = this.getMovie.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.state = {
      currentMovie: {
        id: null,
        name: "",
        releaseYear: "",
        published: false
      },
      message: ""
    };
  }
  componentDidMount() {
    this.getMovie(this.props.match.params.id);
  }
  onChangeName(e) {
    const name = e.target.value;
    this.setState(function(prevState) {
      return {
        currentMovie: {
          ...prevState.currentMovie,
          name: name
        }
      };
    });
  }
  onChangeReleaseYear(e) {
    const releaseYear = e.target.value;
    
    this.setState(prevState => ({
      currentMovie: {
        ...prevState.currentMovie,
        releaseYear: releaseYear
      }
    }));
  }
  getMovie(id) {
    MovieDataService.get(id)
      .then(response => {
        this.setState({
          currentMovie: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  updateMovie() {
    MovieDataService.update(
      this.state.currentMovie.id,
      this.state.currentMovie
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The movie was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  deleteMovie() {    
    MovieDataService.delete(this.state.currentMovie.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/movies')
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { currentMovie } = this.state;
    return (
      <div>
        {currentMovie ? (
          <div className="edit-form">
            <h4>Movie</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentMovie.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="releaseYear">ReleaseYear</label>
                <input
                  type="text"
                  className="form-control"
                  id="releaseYear"
                  value={currentMovie.releaseYear}
                  onChange={this.onChangeReleaseYear}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentMovie.published ? "Published" : "Pending"}
              </div>
            </form>
            {currentMovie.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteMovie}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMovie}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Movie...</p>
          </div>
        )}
      </div>
    );
  }
}