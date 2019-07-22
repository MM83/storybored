import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

class ViewAttributes extends React.Component {

  constructor(props)
  {
    super(props);
    //<Route path="/home" component={ViewHome}/>
  }



  render() {
      return (
        <div className="app-panel">
          <div className="generic-panel">
            <div className="generic-list">
              <h2>Attributes</h2>
              <h6>Properties of items and characters</h6>
              <div className="generic-list-expander">
                <div className="generic-list-scroller"></div>
              </div>
              <Button className="generic-new-button">New Attribute</Button>
            </div>
          </div>
        </div>

      );
  }

}

export default ViewAttributes;
