import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Route} from "react-router-dom";


import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

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

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    alert('You have been logged out');
    window.open('/', '_self');
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
      const {movies, users} = this.state;
      
      // if (!register) return <RegistrationView onRegistered={register =>
      //   this.onRegistered(register)} />;


      // before the movies have been loaded
      if (!movies) return <div className="main-view"/>;

      return(
        
        <Router>
          <div className="main-view">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>MyFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link onClick={() => this.onLoggedOut()}>Logout</Nav.Link>
                </Nav>
          </Navbar.Collapse>
          </Navbar>

              <Route exact path="/" render={() => {
                if(!users) return <LoginView onLoggedIn={user =>
                this.onLoggedIn(user)} />;
                return movies.map(m => <MovieCard key={m._id} 
                movie={m}/>)} }/>

              <Route path="/register" render={() => <RegistrationView />} />

              <Route path="/movies/:movieId" render={({match}) =>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>

              <Route exact path="/" render={() =>
              movies.map( m => <MovieCard key={m._id} movie={m}/>)}/>

              <Route path="/director/:name" render={({match}) => {
                // if (!movies) return <div className="main-view"/>;
              return <DirectorView movies={movies.find(m =>
                  m.Director.Name === match.params.name)}/>}
              }/>

              <Route path="/genre/:name" render={({match}) => {
                // if (!movies) return <div className="main-view"/>;
                return <GenreView movies={movies.find(m =>
                  m.Genre.Name === match.params.name)}/>}
              }/>

              <Route path="/users/:Username" render={() => <ProfileView />}/>


          </div>
        </Router>
      );
    }
}