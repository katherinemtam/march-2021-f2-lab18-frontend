import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isMyFavorite } from '../utils/artworks-api';
import './Artwork.css';

export default class Artwork extends Component {
  state = {
    isFavorite: false,
  };

  async componentDidMount() {
    this.setState({
      isFavorite: await isMyFavorite(this.props.artwork.objectID),
    });
  }

  handleClick = (e) => {
    try {
      e.preventDefault();
      const { artwork, onFavorited } = this.props;
      const isFavorite = !this.state.isFavorite;
      onFavorited(artwork, isFavorite);
      this.setState({ isFavorite });
    } catch (err) {
      console.log(err.message);
    }
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
