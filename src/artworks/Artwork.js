import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Artwork.css';

export default class Artwork extends Component {
  render() {
    const { artwork } = this.props;
    return (
      <li className={artwork.isHighlight ? 'impArtwork' : 'Artwork'}>
        <Link to={`/artworks/${artwork.objectID}`}>
          <h2>{artwork.title}</h2>
          <img src={artwork.url} alt={artwork.title} />
          <button>♡</button>
        </Link>
      </li>
    );
  }
}
