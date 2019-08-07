import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../js/Core';
import GenericListItem from './components/GenericListItem';
import NoteList from './components/NoteList';
import TagList from './components/TagList';
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
    Core.addEventListener("item-deleted", this.stateChange);
    Core.addEventListener("item-selected", this.stateChange);
    Core.addEventListener("item-info-changed", this.stateChange);
  }

  componentWillUnmount()
  {
    Core.removeEventListener("item-created", this.stateChange);
    Core.removeEventListener("item-deleted", this.stateChange);
    Core.removeEventListener("item-selected", this.stateChange);
    Core.removeEventListener("item-info-changed", this.stateChange);
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
            <div className="generic-main-panel">


              {
                (story.items.length == 0) && (<div className="empty-main-panel">No items!</div>)
              }

              {
                ((story.items.length > 0) && selectedItem) && (
                  <div className="generic-main-scroller">

                    <h2>Name</h2>
                    <h6>The name of your item</h6>
                    <FormControl className="no-flex-shrink" value={selectedItem.name} onChange={(e)=>{
                      selectedItem.name = e.currentTarget.value;
                      Core.dispatchEvent("item-info-changed", selectedItem);
                    }}></FormControl>

                    <div className="h-spacer"></div>


                    <h2>Tags</h2>
                    <h6>Any tags you wish to associate with this item</h6>
                    <TagBar target={selectedItem}/>

                    <div className="h-spacer"></div>


                    <h2>Description</h2>
                    <h6>A brief summary of your item</h6>
                    <textarea value={selectedItem.desc} className="synopsis-textarea" onChange={(e)=>{
                      selectedItem.desc = e.currentTarget.value;
                      Core.dispatchEvent("character-info-changed", selectedItem);
                    }}>
                    </textarea>

                    <div className="h-spacer"></div>


                    <h2>Notes</h2>
                    <h6>Any notes you wish to make about this item</h6>
                    <NoteList/>

                  </div>
                )
              }



            </div>
          </div>
        </div>

      );
  }

}

export default ViewItems;
