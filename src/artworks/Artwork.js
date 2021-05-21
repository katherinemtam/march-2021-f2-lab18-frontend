import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Artwork.css';

export default class Artwork extends Component {
  state = {
    isFavorite: false,
  };

  componentDidMount() {
    this.setState({ isFavorite: this.props.isFavorite });
  }

  handleClick = (e) => {
    e.preventDefault();
    const { artwork, onFavorited } = this.props;
    onFavorited(artwork, this.state.isFavorite);
    this.setState({ isFavorite: !this.state.isFavorite });
  };

  render() {
    const { artwork } = this.props;
    const { isFavorite } = this.state;
    return (
      <li className={artwork.isHighlight ? 'impArtwork' : 'Artwork'}>
        <Link to={`/artworks/${artwork.objectID}`}>
          <h2>{artwork.title}</h2>
          <img src={artwork.url} alt={artwork.title} />
          <button onClick={this.handleClick}>{isFavorite ? '♥️' : '♡'}</button>
        </Link>
      </li>
    );
  }
}
