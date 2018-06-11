import React, { Component } from 'react';

class ShipPicker extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(type) {
    this.props.pickShipType(type);
  }
  render() {
    return (
      <div className="picker">
        <h2>Picker</h2>
        <div className="shadow" onClick={() => this.handleClick(4)}>
          Carrier
        </div>
        <div className="shadow" onClick={() => this.handleClick(3)}>
          Battleship
        </div>
        <div className="shadow" onClick={() => this.handleClick(2)}>
          Cruiser
        </div>
        <div className="shadow" onClick={() => this.handleClick(1)}>
          Destroyer
        </div>
      </div>
    );
  }
}

export default ShipPicker;
