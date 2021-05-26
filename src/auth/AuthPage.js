import React, { Component } from 'react';
import { signUp, signIn } from '../utils/artworks-api';
import './AuthPage.css';

class AuthPage extends Component {
  state = { 
    name: '',
    email: '',
    password: '',
    isSignUp: true
  }

  handleSwitch = e => {
    e.preventDefault();
    this.setState({ isSignUp: !this.state.isSignUp });
    console.log(this.state.isSignUp);
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { isSignUp } = this.state;
    const { onUser, history } = this.props;

    try {
      const action = isSignUp ? signUp : signIn;
      const user = await action(this.state);

      onUser(user);      

      history.push('/');
    }
    catch (err) {
      console.log(err);
    }
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value });
  }

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  }

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  }


  render() { 
    const { name, email, password, isSignUp } = this.state;

    return ( 
      <div className="AuthPage">
        <h2>Sign {isSignUp ? 'Up' : 'In'}</h2>

        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input 
              name="name" 
              value={name} 
              onChange={this.handleNameChange}/>
          </label>
          <label>
            Email:
            <input 
              name="email" 
              value={email}
              onChange={this.handleEmailChange}/>
          </label>
          <label>
            Password:
            <input 
              name="email" 
              value={password}
              type="password"
              onChange={this.handlePasswordChange}/>
          </label>
          <button onClick={this.handleSubmit}>
            Sign {isSignUp ? 'Up' : 'In'}
          </button>
          <button onClick={this.handleSwitch}>
            {isSignUp
              ? 'Already have an account?'
              : 'Create an account'
            }
          </button>
        </form>
      </div>
    );
  }
}
 
export default AuthPage;