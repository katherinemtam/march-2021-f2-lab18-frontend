import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from '../home/Home';
import AuthPage from '../auth/AuthPage';
import ArtworksPage from '../artworks/ArtworksPage';
import ArtworkDetail from '../artworks/ArtworkDetail';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    token: window.localStorage.getItem('TOKEN'),
    userId: window.localStorage.getItem('USER_ID'),
    userName: window.localStorage.getItem('USER_NAME'),
  };

  handleUser = (user) => {
    window.localStorage.setItem('TOKEN', user.token);
    window.localStorage.setItem('USER_ID', user.id);
    window.localStorage.setItem('USER_NAME', user.name);
    this.setState({ token: user.token });
  };

  render() {
    return (
      <div className='App'>
        <Router>
          <Header />
          <main>
            <Switch>
              <Route
                path='/'
                exact={true}
                render={(routerProps) => <Home {...routerProps} />}
              />

              <Route
                path='/auth'
                exact={true}
                render={(routerProps) => (
                  <AuthPage {...routerProps} onUser={this.handleUser} />
                )}
              />

              <Route
                path='/artworks'
                exact={true}
                render={(routerProps) =>
                  this.state.token ? (
                    <ArtworksPage {...routerProps} />
                  ) : (
                    <Redirect to='/auth' />
                  )
                }
              />

              <Route
                path='/artworks/:id'
                exact={true}
                render={(routerProps) =>
                  this.state.token ? (
                    <ArtworkDetail {...routerProps} />
                  ) : (
                    <Redirect to='/auth' />
                  )
                }
              />

              <Redirect to='/' />
            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
