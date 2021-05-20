import { Component } from 'react';
import Gallery from '../artworks/Gallery';
import './Favorites.css';
import { getMyFavorites } from '../utils/artworks-api';

export default class favorites extends Component {
  state = {
    favorites: [],

  }
  async componentDidMount() {
    try {
      const artwork = await getMyFavorites();
      this.setState({ favorites: artwork });
    }
    catch (err) {
      console.log(err.message);
    }
  }
  render() {
    const { favorites } = this.state;
    return (
      <div className="favorites">
        <Gallery favorites={favorites} />
      </div>
    );
  }

}