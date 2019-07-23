import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

class ViewCharacters extends React.Component {

  constructor(props)
  {
    super(props);
    //<Route path="/home" component={ViewHome}/>
  }

  //
  // <div className="generic-main-scroller">
  //
  //   <h2>Name</h2>
  //   <h6>The name of your character</h6>
  //   <FormControl></FormControl>
  //
  //   <div className="h-spacer"></div>
  //
  //
  //   <h2>Tags</h2>
  //   <h6>Any tags you wish to associate with this character</h6>
  //   <FormControl></FormControl>
  //
  //   <div className="h-spacer"></div>
  //
  //
  //   <h2>Description</h2>
  //   <h6>A brief summary of your character</h6>
  //   <textarea className="synopsis-textarea">
  //   </textarea>
  //
  // </div>

  render() {
      return (
        <div className="app-panel">
          <div className="generic-panel">
            <div className="generic-list">
              <h2>Characters</h2>
              <h6>The characters in your story</h6>
              <div className="generic-list-expander">
                <div className="generic-list-scroller"></div>
              </div>
              <Button className="generic-new-button">New Character</Button>
            </div>
            <div className="generic-main-panel">

              <div className="empty-main-panel">No characters!</div>

            </div>
          </div>
        </div>

      );
  }

}

export default ViewCharacters;
