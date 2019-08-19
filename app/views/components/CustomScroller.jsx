import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

class Comp extends React.Component {

  constructor(props)
  {
    super(props);
    //<Route path="/home" component={ViewHome}/>
  }

  // <div className="custom-scroller-h-content">
  //   <div className="custom-scroller-v-content"></div>
  //   <div className="custom-scroller-v-bar"></div>
  // </div>
  // <div className="custom-scroller-h-bar"></div>


  render() {
      return (
        <div className="custom-scroller-container">
          <div className="custom-scroller-h-content">
            <div className="custom-scroller-v-content"></div>
            <div className="custom-scroller-v-bar">
              <div className="custom-scroller-range">
                <div className="custom-scroller-button">B</div>
              </div>
            </div>
          </div>
          <div className="custom-scroller-h-bar">
            <div className="custom-scroller-range">
              <div className="custom-scroller-button">B</div>
            </div>
            <div className="custom-scroller-corner-button"></div>
          </div>
        </div>

      );
  }

}

export default Comp;
