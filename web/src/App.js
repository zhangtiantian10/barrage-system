import React, { Component } from 'react';
import cssModules from 'react-css-modules'
import logo from './logo.svg';
import styles from './App.scss';

class App extends Component {
  render() {
    return (
      <div styleName="App">
        <header styleName="App-header">
          <img src={logo} styleName="App-logo" alt="logo" />
          <h1 styleName="App-title">Welcome to React</h1>
        </header>
        <p styleName="App-intro">
          To get started,<code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default cssModules(App, styles);
