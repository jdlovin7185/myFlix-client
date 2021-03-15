import React from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route} from "react-router-dom";


import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      register: null
    };
  }


  

  getMovies(token) {
    axios.get('https://myflix1-0.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
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
  
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
  

  onRegistered(register) {
    this.setState({
      register
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }


    render() {
      const {movies, user} = this.state;
      
      // if (!register) return <RegistrationView onRegistered={register =>
      //   this.onRegistered(register)} />;


      // before the movies have been loaded
      if (!movies) return <div className="main-view"/>;

      return(
        <Router>
          <div className="main-view">

              <Route exact path="/" render={() => {
                if(!user) return <LoginView onLoggedIn={user =>
                this.onLoggedIn(user)} />;
                return movies.map(m => <MovieCard key={m._id} 
                movie={m}/>)} }/>

              <Route path="/register" render={() => <RegistrationView />} />

              {/* <Route exact path="/" render={() =>
              movies.map( m => <MovieCard key={m._id} movie={m}/>)}/> */}

              <Route path="/movies/:movieId" render={({match}) =>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>

              <Route exact path="/directors/:name" render={({ match }) => {
                if (!movies) return <div className="main-view"/>;
                return <DirectorView director={movies.find(m =>
                  m.Director.Name === match.params.name).Director}/>}
              }/>

              <Route path="/genre/:name" render={({ match }) => {
                if (!movies) return <div className="main-view"/>;
                return <GenreView genre={movies.find(m =>
                  m.Genre.Name === match.params.name).Genre}/>}
              }/>

          </div>
        </Router>
      );
    }
}