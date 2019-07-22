import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

class ViewEvents extends React.Component {

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
              <h2>Events</h2>
              <h6>Things that happen in your story</h6>
              <div className="generic-list-expander">
                <div className="generic-list-scroller"></div>
              </div>
              <Button className="generic-new-button">New Event</Button>
            </div>
          </div>
        </div>

      );
  }

}

export default ViewEvents;
