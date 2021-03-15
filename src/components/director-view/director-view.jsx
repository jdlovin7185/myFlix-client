import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './director-view.scss';

import {Card} from 'react-bootstrap';

export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    
    return (
      <div className="director-view">
        <Card>
          <Card.Title>{movie.Director.name}</Card.Title>
          <Card.Body>
            <Card.Text>{movie.Director.Bio}</Card.Text>
            <Card.Text>Director: {movie.Director.Birth}</Card.Text>
            <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
          </Card.Body>
        </Card>
        <Card.Footer>
        </Card.Footer>
      </div>
    );
  }
}

DirectorView.propTypes = {
  movie: PropTypes.shape({
    Director: PropTypes.object.isRequired,
  })
}