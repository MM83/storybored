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
          <h1>Properties</h1>
          <a href="#/synopsis">Story</a>
          <a href="#/notes">Notes</a>
          <a href="#/attributes">Attributes</a>
          <h1>Actors</h1>
          <a href="#/characters">Characters</a>
          <a href="#/items">Items</a>
          <a href="#/events">Events</a>
          <h1>Space</h1>
          <a href="#/locations">Locations</a>
          <a href="#/regions">Regions</a>
          <a href="#/world">World</a>
        </div>
      );
  }

}

export default ViewApp;
