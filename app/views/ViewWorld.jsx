import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

class ViewWorld extends React.Component {

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

            <div className="generic-list-expander">
              <div className="generic-list-scroller">
                <h2>Locations</h2>
                <h2>Regions</h2>
                <h2>Annotations</h2>
                <h2>Shapes</h2>

              </div>
            </div>

            <div className="world-toolset">
              <Button>Add Shape</Button>
              <Button>Add Annotation</Button>
              <Button>Upload Map Image</Button>
            </div>

          </div>
          </div>
        </div>
      );
  }

}

export default ViewWorld;
