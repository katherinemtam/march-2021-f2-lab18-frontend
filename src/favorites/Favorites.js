import React, { Component } from 'react';
import Gallery from '../artworks/Gallery';
import {
  addFavorite,
  deleteFavorite,
  getMyFavorites,
} from '../utils/artworks-api';
import './Favorites.css';

export default class Favorites extends Component {
  state = {
    favorites: [],
  };

  async componentDidMount() {
    this.setState({ favorites: await getMyFavorites() });
  }

  handleFavorite = async (artwork, isFavorite) => {
    try {
      debugger;
      const { favorites } = this.state;
      if (isFavorite) {
        const response = await addFavorite(artwork);
        if (response.status !== 200) {
          throw new Error(response.body);
        }
        const favorite = response.body;
        // add artwork to favorites array
        favorites.splice(1, 0, favorite);
      } else {
        // find the artwork id to delete
        let index = 0;
        for (let i = 0; i < favorites.length; i++) {
          if (favorites[i].objectID === artwork.objectID) {
            index = i;
            break;
          }
        }
        const favoriteId = favorites[index].id;
        const response = await deleteFavorite(favoriteId);
        if (response.status !== 200) {
          throw new Error(response.body);
        }
        // delete the artwork from favorites array
        favorites.splice(index, 1);
      }
      this.setState({ favorites: [...favorites] });
    } catch (err) {
      console.log(err.message);
    }
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
