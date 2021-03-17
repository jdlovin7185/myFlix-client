import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './profile-view.scss';

import {Card, Form} from 'react-bootstrap';

export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      email: null
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    axios.get('https://myflix1-0.herokuapp.com/users/${user}', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        FavoriteMovies: response.data.FavoriteMovies
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateUser(user) {
    axios.put('https://myflix1-0.herokuapp.com/users/:Username', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        FavoriteMovies: response.data.FavoriteMovies
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  removeFav(movie) {
    axios.delete('https://myflix1-0.herokuapp.com/users', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  removeUser() {
    axios.delete('https://myflix1-0.herokuapp.com/users/${user}', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState
  })
  .catch(function (error) {
  console.log(error)
  });
}

  render() {
    const {movies, users} = this.state;
    
    // if (!register) return <RegistrationView onRegistered={register =>
    //   this.onRegistered(register)} />;


    // before the movies have been loaded
    if (!users) return <div className="profile-view"/>;

    return (
      <div className="profile-view">
         <Card>
          <Card.Title>Profile info</Card.Title>
          <Card.Body>
            <Card.Text>{users.Username}</Card.Text>
            <Card.Text>{users.Email}</Card.Text>
            <Card.Text>{users.FavoriteMovie}</Card.Text>              
          </Card.Body>
        </Card>
        {/* <Form className="updateInfo-form">
      <h2>Want to update some info?</h2>
      <Form.Group controlId="formGroupUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="username" value={username}
      onChange={e => setUsername(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password}
          onChange={e => setPassword(e.target.value)} />
      </Form.Group>   
      <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email sm" value={email}
          onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" 
        onClick={handleSubmit}>
          Submit
      </Button>
    </Form> */}
      </div>
    );
  }
}