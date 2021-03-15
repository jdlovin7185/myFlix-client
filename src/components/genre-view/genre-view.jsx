import React from 'react';
import PropTypes from 'prop-types';
import './genre-view.scss';

import {Card} from 'react-bootstrap';

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    
    return (
      <div className="genre-view">
        <Card>
          <Card.Title>{movie.Genre.name}</Card.Title>
          <Card.Body>
            <Card.Text>{movie.Genre.Description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

GenreView.propTypes = {
  movie: PropTypes.shape({
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.object.isRequired,

  })
}