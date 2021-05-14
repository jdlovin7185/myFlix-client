import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

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

 // Removes a user from the database
 removeUser(token) {
  let url = `https://myflix1-0.herokuapp.com/users/${localStorage.getItem('user')}`;
  axios.delete(url, {headers: {Authorization: `Bearer ${token}`}
  }) 
  .then(() => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
    this.setState({
      user: null,
});
alert('Your account has been deleted');
})
.catch(e => {
  console.log(e)
});
};

// Removes a movie from the users list
 removeFav(movies) {
  let token = localStorage.getItem('token');
  let url = 'https://myflix1-0.herokuapp.com/users/' + localStorage.getItem('user') + '/movies/' + movies._id;
  axios.delete(url, {headers: {Authorization: `Bearer ${token}`},
  })
  .then((response) => {
    console.log(response);
    // Refreshes page after a movie is removed
    window.location.reload();
});
  alert('Removed from the list!');
}




  render() {
    const { movies } = this.props;
    const { user } = this.state;

    const favoriteMovieList = movies.filter((movies) => {
      return user.FavoriteMovies.includes(movies._id);
    });
    


    if (!user) return null;

    return (
      <div>
      <Card>
        <Card.Body>
          <Card.Title>Welcome, {user.Username}!</Card.Title>
          <Card.Text>Email: {user.Email}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link to={`/user/${user}`}>
            <Button variant="link">Update Profile</Button>
          </Link>
        </Card.Footer>
      </Card>
      <div>
        <h2 className="title" >Favorite Movies</h2>
        {favoriteMovieList.map((movies) => {
          return (
            <div className="movie-border" key={movies._id}>
              <Card style={{ width: '40rem' }}>
                <Card.Title>{movies.Title}</Card.Title>
                <Image src={movies.ImagePath}/>
                <Card.Body>
                  <Link to={`/movies/${movies._id}`}>
                    <Card.Title>{movies.Title}</Card.Title>
                  </Link>
                </Card.Body>
              </Card>
              <Card.Footer>
                <Button variant="warning" onClick={() => this.removeFav(movies)}>Remove from list</Button>
              </Card.Footer>
          </div>
          )
        })
      }
  </div>
    <Button className="deactivate-btn" variant="danger" onClick={() => this.removeUser()}>Deactivate Account</Button>
  </div>
    );
  }
}

ProfileViewInfo.propTypes = {
  movies: PropTypes.array.isRequired,
};