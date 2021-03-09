import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email);
    props.onRegistered(username)
  };

  return (
    <Form className="registration-form">
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