import { Component } from 'react';
import ArtworkSearch from './ArtworkSearch';
import Gallery from './Gallery';
import {
  getArtworks,
  addFavorite,
  deleteFavorite,
  getMyFavorites,
} from '../utils/artworks-api';
import './ArtworksPage.css';

export default class ArtworksPage extends Component {
  state = {
    artworks: [],
    favorites: [],
  };

  async componentDidMount() {
    this.setState({ favorites: await getMyFavorites() });
  }

  handleSearch = async (search) => {
    try {
      const searchedArtworks = await getArtworks(search);
      this.setState({ artworks: searchedArtworks });
    } catch (err) {
      console.log(err.message);
    }
  };

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
    const { artworks } = this.state;
    return (
      <div className='ArtworksPage'>
        <ArtworkSearch onSearch={this.handleSearch} />
        <Gallery artworks={artworks} onFavorited={this.handleFavorite} />
      </div>
    );
  }
}
