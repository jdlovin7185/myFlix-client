import React from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: null
    };
  }

  componentDidMount() {
    axios.get('https://myflix1-0.herokuapp.com/movies')
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    }) 
    .catch(function (error) {
      console.log(error);
    });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onRegistered(register) {
    this.setState({
      register
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }


    render() {
      const {movies, selectedMovie, user, register} = this.state;
      
      if (!register) return <RegistrationView onRegistered={register =>
        this.onRegistered(register)} />;

      if (!user) return <LoginView onLoggedIn={user => 
        this.onLoggedIn(user)} />;


      // before the movies have been loaded
      if (!movies) return <div className="main-view"/>;

      return(
        <Row className="main-view justify-content-md-center">
        { selectedMovie
        ? (
            <Col md={8}>
            <MovieView movie={selectedMovie} onBackClick={movie =>
              this.onMovieClick(null)}/>
            </Col>  
        )
        : movies.map(movie => (
           <Col md={3}>
          <MovieCard key={movie._id} movie={movie}
          onClick={movie => this.onMovieClick(movie)}/>
          </Col>
        ))
      }
    </Row>
      );
    }
}