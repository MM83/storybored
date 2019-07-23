import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import TagBar from './components/TagBar';

class ViewStory extends React.Component {

  constructor(props)
  {
    super(props);
  }




  render() {

      return (
        <div className="app-panel">
          <div className="app-panel-scroller">

            <h2>Story Name</h2>
            <h6>The title of your story</h6>
            <FormControl></FormControl>
            <div className="h-spacer"></div>
            <h2>Tags</h2>
            <h6>Words or phrases you can use to organise and associate areas of your story.</h6>
            <TagBar target="all"/>

            <div className="content-expander">
              <div className="h-spacer"></div>
              <h2>Synopsis</h2>
              <h6>A brief description of the story</h6>
              <textarea maxLength="500" className="synopsis-textarea">
              </textarea>
            </div>
          </div>

        </div>

      );
  }

}

export default ViewStory;
