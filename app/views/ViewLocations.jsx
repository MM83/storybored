import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../js/Core';
import GenericListItem from './components/GenericListItem';
import NoteList from './components/NoteList';
import TagList from './components/TagList';
import TagBar from './components/TagBar';

class ViewLocations extends React.Component {

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
    Core.addEventListener("location-created", this.stateChange);
    Core.addEventListener("location-selected", this.stateChange);
    Core.addEventListener("location-info-changed", this.stateChange);
  }

  componentWillUnmount()
  {
    Core.removeEventListener("location-created", this.stateChange);
    Core.removeEventListener("location-selected", this.stateChange);
    Core.addEventListener("location-info-changed", this.stateChange);
  }



  render() {

      let story = Core.query("get-story");
      let selectedLocation = story.locations[story.selectedLocation];

      return (
        <div className="app-panel">
          <div className="generic-panel">
            <div className="generic-list">
              <h2>Locations</h2>
              <h6>The places in your story</h6>
              <div className="generic-list-expander">
                <div className="generic-list-scroller">
                  {
                      story.locations.map((item, index)=>{
                        return (<GenericListItem type="location" index={index} item={item} key={index} selected={index == story.selectedLocation}/>)
                      })
                  }
                </div>
              </div>
              <Button className="generic-new-button" onClick={ ()=>{
                  Core.exec("create-location");
                }}>New Location</Button>
            </div>
            <div className="generic-main-panel">


              {
                (story.locations.length == 0) && (<div className="empty-main-panel">No locations!</div>)
              }

              {
                ((story.locations.length > 0) && selectedLocation) && (
                  <div className="generic-main-scroller">

                    <h2>Name</h2>
                    <h6>The name of your location</h6>
                    <FormControl className="no-flex-shrink" value={selectedLocation.name} onChange={(e)=>{
                      selectedLocation.name = e.currentTarget.value;
                      Core.dispatchEvent("location-info-changed", selectedLocation);
                    }}></FormControl>

                    <div className="h-spacer"></div>

                    <h2>Region</h2>
                    <h6>The  parent region, determined on map screen</h6>
                      <FormControl className="no-flex-shrink" value={"No current region"} disabled></FormControl>




                    <h2>Tags</h2>
                    <h6>Any tags you wish to associate with this location</h6>
                    <TagBar target={selectedLocation}/>

                    <div className="h-spacer"></div>


                    <h2>Description</h2>
                    <h6>A brief summary of your location</h6>
                    <textarea value={selectedLocation.desc} className="synopsis-textarea" onChange={(e)=>{
                      selectedLocation.desc = e.currentTarget.value;
                      Core.dispatchEvent("location-info-changed", selectedLocation);
                    }}>
                    </textarea>

                    <div className="h-spacer"></div>


                    <h2>Notes</h2>
                    <h6>Any notes you wish to make about this location</h6>
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

export default ViewLocations;
