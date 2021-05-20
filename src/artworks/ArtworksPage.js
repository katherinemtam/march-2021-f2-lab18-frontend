import { Component } from 'react';
import ArtworkSearch from './ArtworkSearch';
import Gallery from './Gallery';
import './ArtworksPage.css';

export default class ArtworksPage extends Component {
  
  handleSearch = async search => {
    try {
      const artworks = await getArtworks(search);
    } catch {

    }
  }

  render() {
    return (
      <div className="ArtworksPage">
        <ArtworkSearch/>
        <Gallery/>
      </div>
    );
  }

}