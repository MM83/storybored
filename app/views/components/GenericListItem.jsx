import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

class Comp extends React.Component {

  constructor(props)
  {
    super(props);
  }

  render() {
      return (
        <div className={this.props.selected ? "generic-list-item-selected" : "generic-list-item"}>
          <div className="generic-list-item-title">{this.props.title}</div>
          <div className="generic-list-item-options">
            <div>Duplicate</div>
            <div>Delete</div>
          </div>
        </div>

      );
  }

}

export default Comp;
