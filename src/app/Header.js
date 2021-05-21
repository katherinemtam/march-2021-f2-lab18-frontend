import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className='Header'>
        <h1>Met Museum Artworks</h1>
        <NavLink to='/favorites'>Favorites</NavLink>
        <NavLink to='/artworks'>Search</NavLink>
      </header>
    );
  }
}

export default Header;
