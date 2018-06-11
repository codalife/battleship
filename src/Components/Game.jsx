import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Battleship from '../Logic/Battleship';
import Bezier from '../Logic/Bezier';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: new Battleship(),
    };

    this.handleClick = this.handleClick.bind(this);
    this.createBoard = this.createBoard.bind(this);
  }
  createBoard() {
    return this.state.game.player.map((row, rowIndex) => (
      <div className="row" key={`row${rowIndex}`}>
        {row.map((cell, columnIndex) => (
          <div
            className="cell"
            key={`column${columnIndex} row${rowIndex}`}
            onClick={e => this.handleClick(e, rowIndex, columnIndex)}
          >
            {/* {`${rowIndex} ${columnIndex}`} */}
          </div>
        ))}
      </div>
    ));
  }
  handleClick(e) {
    console.dir(e.target);
    const buttonPosition = document
      .querySelector('button')
      .getBoundingClientRect();

    const start = [buttonPosition.x, buttonPosition.y];
    const end = [e.target.offsetLeft, e.target.offsetTop];

    const trajectory = Bezier(start, end);

    const missle = document.createElement('div');

    missle.classList.add('missle');
    document.body.appendChild(missle);

    trajectory.forEach((point, index) => {
      setTimeout(() => {
        missle.style.left = point[0] + 'px';
        missle.style.top = point[1] + 'px';
        if (index === trajectory.length - 1) {
          document.body.removeChild(missle);
        }
      }, index * 15);
    });
  }
  render() {
    const player = this.createBoard();
    return (
      <div className="gameHolder">
        <div className="boards">
          <div className="ocean" onMouseLeave={this.handleMouseLeave}>
            {player}
          </div>
          <div className="ocean" onMouseLeave={this.handleMouseLeave}>
            {player}
          </div>
        </div>
        <button>
          <Link to="/">Play again</Link>
        </button>
      </div>
    );
  }
}

export default Game;
