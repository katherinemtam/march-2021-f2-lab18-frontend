import { Component } from 'react';
import ArtworkSearch from './ArtworkSearch';
import Gallery from './Gallery';
import {
  getArtworks,
  favoritesHandler,
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
    const { favorites } = this.state;
    this.setState({
      favorites: await favoritesHandler(artwork, isFavorite, favorites),
    });
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
