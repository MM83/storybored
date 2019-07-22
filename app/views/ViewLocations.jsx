import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

class ViewLocations extends React.Component {

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
              <h2>Locations</h2>
              <h6>The places in your story</h6>
              <div className="generic-list-expander">
                <div className="generic-list-scroller"></div>
              </div>
              <Button className="generic-new-button">New Location</Button>
            </div>
          </div>
        </div>

      );
  }

}

export default ViewLocations;
