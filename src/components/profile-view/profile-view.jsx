import React from 'react';
import PropTypes from 'prop-types';
import './profile-view.scss';

import {Card} from 'react-bootstrap';

export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, users } = this.props;

    if (!movies, !users) return <p>:')</p>;
    // if (!movies) return null;

    
    return (
      <div className="profile-view">
        <Card>
          <Card.Title>{movies.Director.name}</Card.Title>
          <Card.Body>
            <Card.Text>{movies.Director.Bio}</Card.Text>
            <Card.Text>Born: {movies.Director.Birth}</Card.Text>              
          </Card.Body>
        </Card>
      </div>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.shape({
    Director: {
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    },
  })
}