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

  return (
    <div className="profile-form">
    <Form>
      <h2>Want to change some info?</h2>
      <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control 
          type="username" 
          value={username}
          placeholder="Enter new Username"
          onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password"
          value={password}
          placeholder="Enter new Password"
          onChange={e => setPassword(e.target.value)} />
      </Form.Group>   
      <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
          type="email" 
          value={email}
          placeholder="Enter new E-mail Address"
          onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" 
        onClick={handleUpdate}>
          Update
      </Button>
    </Form>
  </div>
  );
}
