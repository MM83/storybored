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
        <div className="custom-scroller-container">
          <div className="custom-scroller-content"></div>
          <div className="custom-scroller-bottom-scroller">
            <div className="custom-scroller-drag"></div>
          </div>
          <div className="custom-scroller-left-scroller">
            <div className="custom-scroller-drag"></div>
          </div>
          <div className="custom-scroller-corner"></div>
        </div>

      );
  }

}

export default Comp;
