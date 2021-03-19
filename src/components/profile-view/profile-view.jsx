import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

import './profile-view.scss';
import axios from 'axios';

export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://myflix1-0.herokuapp.com/users/${localStorage.getItem('user')}`,
     {
      // headers: { Authorization: `Bearer ${token}`},
      Username: username,
      Password: password,
      Email: email
    })
      .then(response => {
        const data = response.data;
        props.onUpdatedUserInfo(data);
        console.log(data);
        alert('Updated!') 
    })
      .catch(e => {
        console.log(e)
    });
  };

  const getUser = (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    axios.get(`https://myflix1-0.herokuapp.com/users/${localStorage.getItem('user')}` , 
    { headers: {Authorization: `Bearer ${token}`},
      Username: username,
      Email: email
    })
    .then(response => {
      const data = response.data;
      props.getMovies(data);
      console.log(data);
    })
    .catch(e => {
      console.log(e)
    });
  }

  return (
    <div>
    <Form className="profile-form">
      <h2>Want to change some info?</h2>
      <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control 
          type="username" 
          value={username}
          onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)} />
      </Form.Group>   
      <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
          type="email" 
          value={email}
          onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" 
        onClick={handleUpdate}>
          Update
      </Button>
    </Form>
    <Card>
        <Card.Body>
          <Card.Title>Username: {localStorage.getItem('user')}</Card.Title>
          <Card.Text>{localStorage.getItem('FavoriteMovies')}</Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>EFAWFEFEWFAEFEWEFWAEFWAEFWEAFW</Card.Title>
          <Card.Text>Favorite Movies: {localStorage.getItem('user')}</Card.Text>
        </Card.Body>
        <Button variant="primary" type="submit" 
        onClick={getUser}>
          My Movies
      </Button>
      </Card>
  </div>
  );
}


//   componentDidMount() {
//     let accessToken = localStorage.getItem('token');
//     if (accessToken !== null) {
//       this.setState({
//         user: localStorage.getItem('user')
//       });
//       this.getUser(accessToken);
//     }
//   }

//   getUser(token) {
//     let url = 'https://myflix1-0.herokuapp.com/users/' +
//     localStorage.getItem("user");
//     axios.get(url, {headers: {Authorization: `Bearer ${token}`}
//     })
//     .then(response => {
//       this.setState({
//         // Returns a null user
//         Username: response.data.Username,
//         Email: response.data.Email,
//         FavoriteMovies: response.data.FavoriteMovies
//       });
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }
