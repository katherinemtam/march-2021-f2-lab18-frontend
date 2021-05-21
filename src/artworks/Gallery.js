import { Component } from 'react';
import Artwork from './Artwork';
import './Gallery.css';

export default class Gallery extends Component {
  render() {
    const { artworks, onFavorited } = this.props;
    return artworks.length > 0 ? (
      <ul className='Gallery'>
        {artworks.map((artwork) => (
          <Artwork
            key={artwork.objectID}
            artwork={artwork}
            isFavorite={false}
            onFavorited={onFavorited}
          />
        ))}
      </ul>
    ) : (
      <h2>No artworks to show. Please search for a title of your interest!</h2>
    );
  }
}
