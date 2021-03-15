import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';

import {Card, Button} from 'react-bootstrap';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    
    return (
      <div className="movie-view movie-border">
        <Card>
          <Card.Img className="movie-poster" src={movie.ImagePath}/>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Body>
            <Card.Text>{movie.Description}</Card.Text>
            <Card.Text>Director: {movie.Director.Name}</Card.Text>
            <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
          </Card.Body>
        </Card>
        <Card.Footer>
        <Link to={`/director/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </Card.Footer>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired
  })
}