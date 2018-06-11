import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function populateMatrix() {
  const matrix = [];

  for (let row = 0; row < 10; row += 1) {
    matrix.push(new Array(10).fill('cell'));
  }
  return matrix;
}

function toggleHorizontal(matrix, horizontal, size, row, column) {
  switch (horizontal) {
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

class PlaceShips extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placedBoard: populateMatrix(),
      board: this.createBoard(),
      horizontal: true,
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.contextMenu = this.contextMenu.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.setShip = this.setShip.bind(this);
  }
  createBoard(row, column, size) {
    const matrix = populateMatrix();

    if (size) {
      toggleHorizontal(matrix, this.state.horizontal, 4, row, column);
    }

    return matrix.map((row, rowIndex) => (
      <div className="row" key={`row${rowIndex}`}>
        {row.map((cell, columnIndex) => (
          <div
            className={cell}
            key={`column${columnIndex} row${rowIndex}`}
            onMouseEnter={() => this.handleHover(rowIndex, columnIndex)}
            onClick={() => this.handleClick(rowIndex, columnIndex)}
            onContextMenu={e => this.contextMenu(rowIndex, columnIndex, e)}
          >
            {/* {`${rowIndex} ${columnIndex}`} */}
          </div>
        ))}
      </div>
    ));
  }
  setShip(row, column, size) {
    const matrix = this.state.placedBoard;

    toggleHorizontal(matrix, this.horizontal, size, row, column);

    return matrix;
  }
  handleHover(row, column) {
    this.setState({
      board: this.createBoard(row, column, 4),
    });
  }
  handleClick(row, column) {
    this.setState(
      {
        placedBoard: this.setShip(row, column, 4),
      },
      () => console.log(this.state.placedBoard),
    );
  }
  contextMenu(row, column, e) {
    e.preventDefault();
    const horizontal = !this.state.horizontal;
    this.setState(
      {
        horizontal: horizontal,
      },
      () =>
        this.setState({
          board: this.createBoard(row, column, 4),
        }),
    );
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
        <div className="ocean" onMouseLeave={this.handleMouseLeave}>
          {this.state.board}
        </div>
      </div>
    );
  }
}

export default PlaceShips;
