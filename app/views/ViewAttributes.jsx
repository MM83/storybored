import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
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
    Core.addEventListener("attribute-created", this.stateChange);
    Core.addEventListener("attribute-selected", this.stateChange);
    Core.addEventListener("attribute-info-changed", this.stateChange);
  }

  componentWillUnmount()
  {
    Core.removeEventListener("attribute-created", this.stateChange);
    Core.removeEventListener("attribute-selected", this.stateChange);
    Core.removeEventListener("attribute-info-changed", this.stateChange);
  }



  render() {

      let attr = Core.query("get-attributes").map;
      console.log("ATTTTT", attr);

      let attrib

      return (
        <div className="app-panel">
          <div className="generic-panel">
            <div className="generic-list">
              <h2>Attributes</h2>
              <h6>Properties of items and characters</h6>
              <div className="generic-list-expander">
                <div className="generic-list-scroller">
                  {
                      // story.characters.map((item, index)=>{
                      //   return (<GenericListItem type="char" index={index} item={item} key={index} selected={index == story.selectedCharacter}/>)
                      // })
                  }
                </div>
              </div>
              <Button className="generic-new-button" onClick={ ()=>{
                  Core.exec("open-new-edit-attribute", {
                    new : true
                  });
                }}>New Attribute</Button>
            </div>
          </div>
        </div>
      );
  }

}

export default ViewAttributes;
