import React from 'react';
import $ from 'jquery';
import { Dropdown, Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../js/Core';
import GenericListItem from './components/GenericListItem';
import NoteList from './components/NoteList';
import TagList from './components/TagList';
import TagBar from './components/TagBar';

class ViewAttributes extends React.Component {

  constructor(props)
  {
    super(props);
    this.stateChange = this.stateChange.bind(this);
  }


  stateChange()
  {
    this.setState({});
  }

  componentDidMount()
  {
  }

  componentWillUnmount()
  {
  }



  render() {

      return (
        <div className="story-scrubber-panel">
          <div className="story-scrubber-inputs">
            <div className="story-scrubber-date-input">
              <h1>Year</h1>
              <input className="ssdi-four"/>
            </div>
            <div className="story-scrubber-date-input">
              <h1>Month</h1>
              <input className="ssdi-two"/>
            </div>
            <div className="story-scrubber-date-input">
              <h1>Day</h1>
              <input className="ssdi-two"/>
            </div>



            <div className="story-scrubber-date-input">
              <h1>Hour</h1>
              <input className="ssdi-two"/>
            </div>

            <div className="story-scrubber-date-input">
              <h1>Minute</h1>
              <input className="ssdi-two"/>
            </div>

            <div className="story-scrubber-date-input">
              <h1>Second</h1>
              <input className="ssdi-two"/>
            </div>
            <div className="flex-grow-1"></div>
            <Dropdown alignRight className="top-bar-drop" >
              <Dropdown.Toggle variant="primary-outline" className="user-dropdown">
                <div className="nav-top-bar-user-name">Tools</div>
              </Dropdown.Toggle>
              <Dropdown.Menu >
                <Dropdown.Item eventKey={"user"} key={0} >Crop...</Dropdown.Item>
                <Dropdown.Item eventKey={"user"} key={1} >Rescale Time...</Dropdown.Item>
                <Dropdown.Item eventKey={"user"} key={1} >Configure Calendar...</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="story-scrubber-range-panel">
            <div className="story-scrubber-range-date">1900</div>
            <input type="range" className="story-scrubber-slide"/>
              <div className="story-scrubber-range-date">2100</div>
          </div>
        </div>
      );
  }

}

export default ViewAttributes;
