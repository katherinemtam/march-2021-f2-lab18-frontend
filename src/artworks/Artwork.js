import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Artwork.css';

export default class Artwork extends Component {
  state = {
    isFavorite: false,
  }
  handleClick = e => {
    e.preventDefault();
    const { isFavorited, artwork } = this.props;
    isFavorited(artwork);
    this.setState({ isFavorite: true });
    console.log(this.state.isFavorite);
  }
  render() {
    const { artwork } = this.props;
    return (
      <li className={artwork.isHighlight ? 'impArtwork' : 'Artwork'}>
        <Link to={`/artworks/${artwork.objectID}`}>
          <h2>{artwork.title}</h2>
          <img src={artwork.url} alt={artwork.title} />
          <button onClick={
            this.handleClick}>♡</button>
        </Link>
      </li>
    );
  }
}
