import { Component } from 'react';
import ArtworkSearch from './ArtworkSearch';
import Gallery from './Gallery';
import { getArtworks } from '../utils/artworks-api';
import './ArtworksPage.css';

export default class ArtworksPage extends Component {

  state = {
    artworks: []
  }
  
  handleSearch = async search => {
    try {
      const searchedArtworks = await getArtworks(search);
      this.setState({ artworks: searchedArtworks })
    } catch(err) {
        console.log(err.message);
    }
  }

  render() {
    const { artworks } = this.state;
    return (
      <div className="ArtworksPage">
        <ArtworkSearch onSearch = {this.handleSearch}/>
        <Gallery artworks = { artworks }/>
      </div>
    );
  }

}