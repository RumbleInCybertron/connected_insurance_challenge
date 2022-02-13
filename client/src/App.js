import React, { Component } from "react";
import { Link, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Index from "./components/index.component";
import MoviesList from "./components/movie-list.component";
import AddMovie from "./components/add-movie.component";
import Movie from "./components/movie.component";

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/movies" className="navbar-brand">
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/movies" className="nav-link">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Index/>} />
            <Route path="/movies" element={<MoviesList/>} />
            <Route path="/add" element={<AddMovie/>} />
            <Route path="/movies/:id" element={<Movie/>} />
          </Routes>
        </div>
      </div>
    );
  }
}
export default App;
