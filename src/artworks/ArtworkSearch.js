import { Component } from 'react';
import './ArtworkSearch.css';

export default class ArtworkSearch extends Component {
  state = {
    search = ''
  }

  handleChange = ({ target }) => {
    this.setState({ search: target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { onSearch } = this.props;
    onSearch(this.state.search);
  }
  
  render() {
    const{ search } = this.state;
    return (
      <div className="ArtworkSearch">
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={search}/>
          <button>Search</button>
        </form>
      </div>
    );
  }

}
