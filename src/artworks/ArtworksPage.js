import { Component } from 'react';
import ArtworkSearch from './ArtworkSearch';
import Gallery from './Gallery';
import {
  getArtworks,
  addFavorite,
  deleteFavorite,
} from '../utils/artworks-api';
import './ArtworksPage.css';

export default class ArtworksPage extends Component {
  state = {
    artworks: [],
    favorites: [],
  };

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
      let updatedArtworks, updatedFavorites;
      const { artworks, favorites } = this.state;
      if (isFavorite) {
        const response = await addFavorite(artwork);
        const favorite = response.body;

        // find the index of the favorite artwork
        let index = 0;
        for (let i = 0; i < artworks.length; i++) {
          if (artworks[i].objectID === favorite.objectID) {
            index = i;
            break;
          }
        }

        // delete the favorite artwork from artworks array
        artworks.splice(index, 1);

        // assign the artworks to an updatedArtworks array
        // not sure if this works, though!
        updatedArtworks = artworks;

        // add response.body to favorites array
        favorites.splice(1, 0, favorite);
        updatedFavorites = favorites;
      } else {
        const response = await deleteFavorite(artwork);

        // find the index of the favorite artwork
        let index = 0;
        for (let i = 0; i < favorites.length; i++) {
          if (favorites[i].objectID === artwork.objectID) {
            index = i;
            break;
          }
        }

        // delete the artwork from favorites array
        favorites.splice(index, 1);

        updatedFavorites = favorites;

        // add the artwork to artworks array
        artworks.splice(1, 0, artwork);
        updatedArtworks = artworks;
      }
      this.setState({ artworks: updatedArtworks, favorites: updatedFavorites });
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    const { artworks, favorites } = this.state;
    return (
      <div className='ArtworksPage'>
        <ArtworkSearch onSearch={this.handleSearch} />
        <Gallery
          artworks={artworks}
          favorites={favorites}
          onFavorited={this.handleFavorite}
        />
      </div>
    );
  }
}
