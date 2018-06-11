const Player = 'player';
const Comp = 'comp';

class Battleship {
  constructor() {
    this.board = new Array(10).fill(new Array(10).fill(0));
    this.player = [];
    this.computer = [];
    this.turn = Player;
  }
}

export default Battleship;
