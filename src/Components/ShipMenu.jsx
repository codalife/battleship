import React, { Component } from 'react';

class ShipMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log(this.props.data);
    if (this.props.data.count > 0) {
      this.props.pickShipType(this.props.data.type);
    } else {
      this.props.setToInit();
    }
  }
  render() {
    return (
      <div className="menu" onClick={this.handleClick}>
        {this.props.data.name}
        {this.props.data.count}
      </div>
    );
  }
}

export default ShipMenu;
