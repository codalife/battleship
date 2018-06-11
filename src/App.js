import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import PlaceShips from './Components/PlaceShips';
import Game from './Components/Game';
import Battleship from './Logic/Battleship';

class App extends Component {
  constructor() {
    super();
    this.state = new Battleship();
  }
  render() {
    return (
      <Router>
        <div>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Battle Ship</h1>
            </header>
          </div>
          <section>
            <Route exact path="/" component={PlaceShips} />
            <Route path="/game" component={Game} />
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
