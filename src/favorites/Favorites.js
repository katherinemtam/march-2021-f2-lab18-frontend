import React, { Component } from 'react';
import Gallery from '../artworks/Gallery';
import { favoritesHandler, getMyFavorites } from '../utils/artworks-api';
import './Favorites.css';

export default class Favorites extends Component {
  state = {
    favorites: [],
  };

  async componentDidMount() {
    this.setState({ favorites: await getMyFavorites() });
  }

  handleFavorite = async (artwork, isFavorite) => {
    const { favorites } = this.state;
    this.setState({
      favorites: await favoritesHandler(artwork, isFavorite, favorites),
    });
  };

  render() {
    const { favorites } = this.state;
    return (
      <div className='Favorites'>
        <Gallery artworks={favorites} onFavorited={this.handleFavorite} />
      </div>
    );
  }
}
