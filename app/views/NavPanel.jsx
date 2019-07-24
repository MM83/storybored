import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';

class ViewApp extends React.Component {

  constructor(props)
  {
    super(props);
  }



  render() {
      return (
        <div className="nav-panel">
          <a href="#/synopsis">Story</a>
          <a href="#/notes">Notes</a>
          <a href="#/attributes">Attributes</a>
          <a href="#/characters">Characters</a>
          <a href="#/items">Items</a>
          <a href="#/locations">Locations</a>
          <a href="#/events">Events</a>
          <a href="#/regions">Regions</a>
          <a href="#/world">World</a>
          <a href="#/timeline">Timeline</a>
        </div>
      );
  }

}

export default ViewApp;
