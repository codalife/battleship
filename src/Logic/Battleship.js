const Player = 'player';
const Comp = 'comp';

function initiateBoard() {
  const board = [];
  for (let i = 0; i < 10; i += 1) {
    board.push(new Array(10).fill(0));
  }
  return board;
}

class Battleship {
  constructor() {
    this.player = initiateBoard();
    this.computer = initiateBoard();
    this.turn = Player;
  }
  toggleTurn() {
    this.turn = this.turn === Player ? Comp : Player;
  }
}

export default Battleship;
