import React, { Component } from "react";
import httpCommon from "../http-common";
import MovieDataService from "../services/movie.service";

export default class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeReleaseYear = this.onChangeReleaseYear.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.newMovie = this.newMovie.bind(this);
    this.getDirectors = this.getDirectors.bind(this);
    this.state = {
      id: null,
      name: "",
      releaseYear: "",
      directors: [],
      directorsLoading: false,
      selectedDirector: null,
      newDirectorFName: "",
      newDirectorLName: "",
      newDirector: false,
    };
  }
  componentDidMount() {
    this.getDirectors();
  }
  getDirectors() {
    this.setState({ directorsLoading: true });
    httpCommon
      .get("/directors")
      .then(({ data }) =>
        this.setState({ directors: data, directorsLoading: false })
      )
      .catch((err) => alert(JSON.stringify(err)));
  }
  onChangeName(e) {
    this.setState({ name: e.target.value });
  }
  onChangeReleaseYear(e) {
    this.setState({
      releaseYear: e.target.value,
    });
  }

  saveMovie() {
    this.setState({ isLoading: true });
    var data = {
      name: this.state.name,
      releaseYear: this.state.releaseYear,
      newDirector: this.state.newDirector,
      newDirectorFirstName: this.state.newDirectorFName,
      newDirectorLastName: this.state.newDirectorLName,
      _director: this.state.selectedDirector,
    };
    MovieDataService.create(data)
      .then((response) => {
        this.setState({
          isLoading: false,
          newMovie: response.data,
          director: response.data.director,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  newMovie() {
    this.setState({
      id: null,
      name: "",
      releaseYear: "",
      director: "",
    });
  }
  render() {
    return (
      <div className="submit-form">
        <div>
          <h2>Add a new movie</h2>
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
          <div className="mt-3 form-group">
            <label htmlFor="releaseYear">Release Year</label>
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

          {this.state.directorsLoading ? (
            <div>Getting directors...</div>
          ) : this.state.newDirector ? (
            <>
              <div className="mt-3 form-group">
                <label htmlFor="newDFName">New Director First Name</label>
                <input
                  required
                  id="newDFName"
                  type="text"
                  name="newDFName"
                  className="form-control"
                  value={this.state.newDirectorFName}
                  onChange={(e) =>
                    this.setState({ newDirectorFName: e.target.value })
                  }
                />
              </div>
              <div className="mt-3 form-group">
                <label htmlFor="newDLName">New Director Last Name</label>
                <input
                  required
                  id="newDLName"
                  type="text"
                  className="form-control"
                  name="newDLName"
                  value={this.state.newDirectorLName}
                  onChange={(e) =>
                    this.setState({ newDirectorLName: e.target.value })
                  }
                />
              </div>
            </>
          ) : (
            <div className="mt-3 form-group">
              <label htmlFor="director">Directed by</label>
              {this.state.selectedDirector}
              <select
                required
                id="director"
                name="director"
                className="form-control"
                value={this.state.selectedDirector}
                onChange={(e) =>
                  this.setState({ selectedDirector: e.target.value })
                }
              >
              <option></option>
                {this.state.directors.map((x) => (
                  <option key={x._id} value={x._id}>
                    {x.firstName} {x.lastName}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="mt-3 d-flex align-items-center">
            <h6 className="flex-grow-1 me-3">New director?</h6>
            <button
              onClick={() =>
                this.setState({ newDirector: !this.state.newDirector })
              }
              className="btn btn-primary"
            >
              {this.state.newDirector ? "Select director" : "Add new director"}
            </button>
          </div>

          <button
            onClick={this.saveMovie}
            disabled={this.state.isLoading}
            className="mt-3 btn btn-success"
          >
            {this.state.isLoading ? "Loading..." : "Submit"}
          </button>
        </div>

        {!this.state.newMovie ? null : (
          <div className="mt-3">
            <h4>Movie submitted successfully!</h4>
            <p>You can keep adding movies.</p>
          </div>
        )}
      </div>
    );
  }
}
