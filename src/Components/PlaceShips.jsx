import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ShipPicker from './ShipPicker';

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

function flip() {
  const target = document.querySelector('.picker');
  console.log(target);
  if (target) {
    target.classList.add('flipper');
  }
}

class PlaceShips extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placedBoard: populateMatrix(),
      board: this.createBoard(),
      horizontal: true,
      isPlacing: false,
      toPlace: [
        { name: 'Battleship', type: 4, count: 1 },
        { name: 'Cruiser', type: 3, count: 2 },
        { name: 'Destroyer', type: 2, count: 3 },
        { name: 'Submarine', type: 1, count: 4 },
      ],
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.contextMenu = this.contextMenu.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.setShip = this.setShip.bind(this);
    this.pickShipType = this.pickShipType.bind(this);
    this.setToInit = this.setToInit.bind(this);
  }
  createBoard(row, column, size) {
    let matrix = [];

    if (this.state) {
      this.state.placedBoard.forEach(row => matrix.push(row.slice()));
    } else {
      matrix = populateMatrix();
    }

    if (this.state && this.state.type) {
      toggleHorizontal(
        matrix,
        this.state.horizontal,
        this.state.type,
        row,
        column,
      );
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
  handleHover(row, column) {
    if (this.state.isPlacing) {
      this.setState({
        board: this.createBoard(row, column),
      });
    }
  }
  setShip(row, column) {
    const matrix = [];

    this.state.placedBoard.forEach(row => matrix.push(row.slice()));

    toggleHorizontal(
      matrix,
      this.state.horizontal,
      this.state.type,
      row,
      column,
    );

    return matrix;
  }
  handleClick(row, column) {
    if (this.state.isPlacing) {
      const toPlace = [...this.state.toPlace];

      toPlace.forEach((data, index) => {
        if (data.type === this.state.type) {
          toPlace[index].count -= 1;
          if (data.count === 0) {
            this.setToInit();
          }
        }
      });

      this.setState({
        placedBoard: this.setShip(row, column),
        toPlace,
      });
    }
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
          board: this.createBoard(row, column),
        }),
    );
  }
  handleMouseLeave() {
    this.setState({
      board: this.createBoard(),
    });
  }
  pickShipType(type) {
    this.setState({
      type,
      isPlacing: true,
    });
  }
  setToInit() {
    console.log(this.state.isPlacing);
    this.setState({
      isPlacing: false,
    });
  }
  render() {
    return (
      <div className="gameHolder">
        <div className="boards">
          <div className="ocean" onMouseLeave={this.handleMouseLeave}>
            {this.state.board}
          </div>

          <ShipPicker
            toPlace={this.state.toPlace}
            pickShipType={this.pickShipType}
            setToInit={this.setToInit}
          />
        </div>

        <button>
          <Link to="/game">Build your fleet</Link>
        </button>
      </div>
    );
  }
}

export default PlaceShips;

/*
TODO:
1. Detect collision
2. Make placed ships different color
3. Feature: remove a ship
4. Feature: drag ship
5. Feature: rotate ship
*/
