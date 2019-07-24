import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../js/Core';
import GenericListItem from './components/GenericListItem';
import TagBar from './components/TagBar';

class ViewItems extends React.Component {

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
    Core.addEventListener("item-created", this.stateChange);
    Core.addEventListener("item-selected", this.stateChange);
  }

  componentWillUnmount()
  {
    Core.removeEventListener("item-created", this.stateChange);
    Core.addEventListener("item-selected", this.stateChange);
  }

  render() {

        let story = Core.query("get-story");

        let selectedItem = story.items[story.selectedItem];

      return (
        <div className="app-panel">
          <div className="generic-panel">
            <div className="generic-list">
              <h2>Items</h2>
              <h6>The objects in the story</h6>
              <div className="generic-list-expander">
                <div className="generic-list-scroller">
                  {
                      story.items.map((item, index)=>{
                        return (<GenericListItem type="item" index={index} item={item} key={index} selected={index == story.selectedItem}/>)
                      })
                  }
                </div>
              </div>
              <Button className="generic-new-button" onClick={ ()=>{
                  Core.exec("create-item");
                }}>New Item</Button>
            </div>
          </div>
        </div>

      );
  }

}

export default ViewItems;
