import React, { Component } from 'react';
import ShipMenu from './ShipMenu';

class ShipPicker extends Component {
  render() {
    const shipMenus = this.props.toPlace.map((data, index) => (
      <ShipMenu
        key={`menu${index}`}
        pickShipType={this.props.pickShipType}
        setToInit={this.props.setToInit}
        data={data}
      />
    ));

    return (
      <div className="picker">
        <h2>Picker</h2>
        {shipMenus}
      </div>
    );
  }
}

export default ShipPicker;
