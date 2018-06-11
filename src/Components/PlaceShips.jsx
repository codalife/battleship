import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlaceShips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(),
      horizontal: true,
    };
    this.handleHover = this.handleHover.bind(this);
    this.contextMenu = this.contextMenu.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  createBoard(row, column, size) {
    const matrix = [];

    for (let row = 0; row < 10; row += 1) {
      matrix.push(new Array(10).fill('cell'));
    }

    if (size) {
      switch (this.state.horizontal) {
        case true:
          let start = Math.min(10 - size, column);
          for (let i = start; i < start + size; i += 1) {
            matrix[row][i] = 'ship';
          }
          break;
        case false:
          start = Math.min(10 - size, row);
          for (let i = start; i < start + size; i += 1) {
            matrix[i][column] = 'ship';
          }
          break;
        default:
          break;
      }
    }

    return matrix.map((row, rowIndex) => (
      <div className="row" key={`row${rowIndex}`}>
        {row.map((cell, columnIndex) => (
          <div
            className={cell}
            key={`column${columnIndex} row${rowIndex}`}
            onMouseEnter={() => this.handleHover(rowIndex, columnIndex)}
            onContextMenu={e => this.contextMenu(rowIndex, columnIndex, e)}
          >
            {/* {`${rowIndex} ${columnIndex}`} */}
          </div>
        ))}
      </div>
    ));
  }
  handleHover(row, column) {
    this.setState({
      board: this.createBoard(row, column, 4),
    });
  }
  handleClick(e) {
    if (e.type === 'click') {
      console.log('Left click');
    } else if (e.nativeEvent.which === 3) {
      e.preventDefault();
      console.log('Right click');
    }
  }
  contextMenu(row, column, e) {
    e.preventDefault();
    const horizontal = !this.state.horizontal;
    this.setState({
      horizontal: horizontal,
      board: this.createBoard(row, column, 4),
    });
  }
  handleMouseLeave() {
    this.setState({
      board: this.createBoard(),
    });
  }
  render() {
    return (
      <div className="gameHolder">
        <Link to="/game">Build your fleet</Link>
        <div
          className="ocean"
          onClick={this.handleClick}
          onMouseLeave={this.handleMouseLeave}
        >
          {this.state.board}
        </div>
      </div>
    );
  }
}

export default PlaceShips;
