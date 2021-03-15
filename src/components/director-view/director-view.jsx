import React from 'react';
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

    if (!movie) return <p>Oh no, what happened?</p>;

    
    return (
      <div className="director-view">
        <Card>
          <Card.Title>{movie.Director.name}</Card.Title>
          <Card.Body>
            <Card.Text>{movie.Director.Bio}</Card.Text>
            <Card.Text>`Born: ${movie.Director.Birth}`</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

DirectorView.propTypes = {
  movie: PropTypes.shape({
    Director: {
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    },
  })
}