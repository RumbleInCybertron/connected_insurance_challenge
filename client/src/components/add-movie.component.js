import React, { Component } from "react";
import MovieDataService from "../services/movie.service";

export default class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeReleaseYear = this.onChangeReleaseYear.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.newMovie = this.newMovie.bind(this);
    this.state = {
      id: null,
      name: "",
      release_year: "", 
      director: "",
    };
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeReleaseYear(e) {
    this.setState({
      release_year: e.target.value
    });
  }
  onChangeDirector(e) {
    this.setState({
      director: e.target.value
    });
  }
  saveMovie() {
    var data = {
      name: this.state.name,
      release_year: this.state.release_year,
      director: this.state.director
    };
    MovieDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          release_year: response.data.release_year,
          director: response.data.director
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  newMovie() {
    this.setState({
      id: null,
      name: "",
      release_year: "",
      director: "",
    });
  }
  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newMovie}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="releaseYear">ReleaseYear</label>
              <input
                type="text"
                className="form-control"
                id="releaseYear"
                required
                value={this.state.releaseYear}
                onChange={this.onChangeReleaseYear}
                name="releaseYear"
              />
            </div>
            <button onClick={this.saveMovie} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
