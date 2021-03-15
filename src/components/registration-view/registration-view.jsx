import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://myflix1-0.herokuapp.com/users', {
    Username: username,
    Password: password,
    Email: email
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/','_self');
        // The second argument '_self' is necessary so that 
        // the page will open in the current tab 
    })
      .catch(e => {
        console.log('error registering the user')
    });
  };

  return (
    <Form className="registration-form">
      <h2>Welcome to the registration page!</h2>
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
    </Form>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }),
  onRegistered: PropTypes.func
}