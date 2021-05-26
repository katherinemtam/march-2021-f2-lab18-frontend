import React, { Component } from 'react';
import { getArtwork } from '../utils/artworks-api';
import './ArtworkDetail.css';

export default class ArtworkDetail extends Component {
  state = {
    artwork: {},
  };

  async componentDidMount() {
    const { match } = this.props;
    try {
      const artwork = await getArtwork(match.params.id);
      this.setState({ artwork });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    const { artwork } = this.state;
    return (
      <div className='ArtworkDetail'>
        <h2>{artwork.title}</h2>
        <img src={artwork.url} alt={artwork.title} />
        <ul>
          <li>Type: {artwork.type}</li>
          <li>Artist: {artwork.artist}</li>
          <li>Period: {artwork.period}</li>
          {artwork.isHighlight ? (
            <li>This is a popular and important artwork in the collection</li>
          ) : (
            <li />
          )}
        </ul>
      </div>
    );
  }
}
