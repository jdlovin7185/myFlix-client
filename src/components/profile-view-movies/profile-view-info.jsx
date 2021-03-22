import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";
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
    const { movies } = this.props;
    const { user } = this.state;

    const favoriteMovieList = movies.filter((movies) => {
      return this.state.user.FavoriteMovies.includes(movies._id);
    });
    


    if (!user) return null;

    return (
      <div>
      <Card>
        <Card.Body>
          <Card.Title>User: {user.Username}</Card.Title>
          <Card.Text>Email: {user.Email}</Card.Text>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
      <div>
        <h2>Favorite Movies</h2>
        {favoriteMovieList.map((movies) => {
          return (
            <div key={movies._id}>
              <Card>
                <Card.Img src={movies.ImagePath}/>
                <Card.Body>
                  <Link to={`/movies/${movies._id}`}>
                    <Card.Title>{movies.Title}</Card.Title>
                  </Link>
                </Card.Body>
              </Card>
          </div>
          )
        })
      }
  </div>
  </div>
    );
  }
}

ProfileViewInfo.propTypes = {
  movies: PropTypes.array.isRequired,
};