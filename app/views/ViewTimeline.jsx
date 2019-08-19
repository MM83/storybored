import React from 'react';
import $ from 'jquery';
import { Dropdown, Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../js/Core';
import GenericListItem from './components/GenericListItem';
import NoteList from './components/NoteList';
import TagList from './components/TagList';
import TagBar from './components/TagBar';
import HorizontalSplitter from './components/HorizontalSplitter';

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
        <div className="app-panel">

          <HorizontalSplitter>
            <div className="h-split-parent">
              fdsfds
            </div>
            <div className="h-split-parent">
              <div className="story-scrubber-range-panel">
                <div className="story-scrubber-range-date">1900</div>
                <input type="range" className="story-scrubber-slide"/>
                <div className="story-scrubber-range-date">2100</div>


                <div className="story-scrubber-inputs">
                  <div className="story-scrubber-date-input">
                    <h1>Year</h1><input className="ssdi-four" type="number"/>
                  </div>
                  <div className="story-scrubber-date-input">
                    <h1>Month</h1><input className="ssdi-two" type="number"/>
                  </div>
                  <div className="story-scrubber-date-input">
                    <h1>Day</h1><input className="ssdi-two" type="number"/>
                  </div>

                    <div className="story-scrubber-date-input">
                      <h1>Hour</h1><input className="ssdi-two" type="number"/>
                    </div>
                    <div className="story-scrubber-date-input">
                      <h1>Minute</h1><input className="ssdi-two" type="number"/>
                    </div>
                    <div className="story-scrubber-date-input">
                      <h1>Second</h1><input className="ssdi-two" type="number"/>
                    </div>
                </div>



              </div>
            </div>
          </HorizontalSplitter>


        </div>
      );
  }

}



//
//
//
//


















export default ViewAttributes;
