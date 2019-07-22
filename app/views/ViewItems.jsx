import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

class ViewItems extends React.Component {

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
              <h2>Items</h2>
              <h6>The objects in the story</h6>
              <div className="generic-list-expander">
                <div className="generic-list-scroller"></div>
              </div>
              <Button className="generic-new-button">New Item</Button>
            </div>
          </div>
        </div>

      );
  }

}

export default ViewItems;
