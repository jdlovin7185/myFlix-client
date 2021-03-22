import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

import axios from 'axios';
import './profile-view-info.scss';

export class ProfileViewInfo extends React.Component {

  constructor() {
    super();

    this.state = {
      user: {
        Username: '',
        Email: '',
        FavoriteMovies: []
      },
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
    let url = `https://myflix1-0.herokuapp.com/user/${localStorage.getItem('user')}`;
    axios.get(url, {headers: {Authorization: `Bearer ${token}`},
  })
  .then((response) => {
    this.setState({
      user: {
      Username: response.data.Username,
      Email: response.data.Email,
      FavoriteMovies: response.data.FavoriteMovies
      },
    });
  });
 }

  render() {
    const { movies, user } = this.state;

    if (!user) return null;

    return (
      <div>
      <Card>
        <Card.Body>
          <Card.Title>User: {user.Username}</Card.Title>
          <Card.Text>Email: {user.Email}</Card.Text>
          <Card.Text>FavoriteMovies: {user.FavoriteMovies}</Card.Text>
          <Card.Text>{movies}</Card.Text>
        </Card.Body>
      </Card>
      </div>
    );
  }
}
