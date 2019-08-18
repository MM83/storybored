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
              RUGGO
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
