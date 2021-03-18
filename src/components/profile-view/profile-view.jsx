import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './profile-view.scss';
import axios from 'axios';

export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
console.log(localStorage.getItem('user'));
  const handleSubmit = (e) => {
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
        // The second argument '_self' is necessary so that 
        // the page will open in the current tab 
    })
      .catch(e => {
        console.log(e)
    });
  };

  return (
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
        onClick={handleSubmit}>
          Update
      </Button>
    </Form>
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

//   updateUser(user) {
//     let url = 'https://myflix1-0.herokuapp.com/users/' +
//     localStorage.getItem("user");
//     axios.put(url, {headers: {Authorization: `Bearer ${token}`}
//     })
//     .then(response => {
//       this.setState({
//         Username: response.data.Username,
//         Password: response.data.Password,
//         Email: response.data.Email,
//         FavoriteMovies: response.data.FavoriteMovies
//       });
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }

//   removeFav(movie) {
//     let url = 'https://myflix1-0.herokuapp.com/users/' +
//     localStorage.getItem("user");
//     axios.delete(url, {headers: {Authorization: `Bearer ${token}`}
//     })
//     .then(response => {
//       this.setState
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }

//   removeUser() {
//     let url = 'https://myflix1-0.herokuapp.com/users/' +
//     localStorage.getItem("user");
//     axios.delete(url, {headers: {Authorization: `Bearer ${token}`}
//     })
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//       this.setState({
//         user: null,
//   });
//   alert('Your account has been deleted');
//   window.open('/', '_self');
// }
// }