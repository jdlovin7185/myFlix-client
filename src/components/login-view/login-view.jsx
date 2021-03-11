import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://myflix1-0.herokuapp.com/movies', {
      Username: username,
      Password: password
    })
  .then(response => {
    const data = response.data;
    props.onLoggedIn(data);
  })
  .catch(e => {
    console.log(e)
    });
  };

    return (
      <Form className="login-border"> 
        <Form.Group controlId="formGroupUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" value={username} 
          onChange={e => setUsername(e.target.value)}/> 
        </Form.Group>

        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} 
          onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" 
        onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  onLoggedIn: PropTypes.func
};