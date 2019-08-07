import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../js/Core';
import GenericListItem from './components/GenericListItem';
import NoteList from './components/NoteList';
import TagList from './components/TagList';
import TagBar from './components/TagBar';

class ViewEvents extends React.Component {

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
    Core.addEventListener("event-created", this.stateChange);
    Core.addEventListener("event-deleted", this.stateChange);
    Core.addEventListener("event-selected", this.stateChange);
    Core.addEventListener("event-info-changed", this.stateChange);
  }

  componentWillUnmount()
  {
    Core.removeEventListener("event-created", this.stateChange);
    Core.removeEventListener("event-deleted", this.stateChange);
    Core.removeEventListener("event-selected", this.stateChange);
    Core.removeEventListener("event-info-changed", this.stateChange);
  }


  render() {

      let story = Core.query("get-story");
      let selectedEvent = story.events[story.selectedEvent];

      return (
        <div className="app-panel">
          <div className="generic-panel">
            <div className="generic-list">
              <h2>Events</h2>
              <h6>Things that happen in your story</h6>
              <div className="generic-list-expander">
                <div className="generic-list-scroller">
                  {
                      story.events.map((item, index)=>{
                        return (<GenericListItem type="event" index={index} item={item} key={index} selected={index == story.selectedEvent}/>)
                      })
                  }
                </div>
              </div>
              <Button className="generic-new-button" onClick={ ()=>{
                  Core.exec("create-event");
                }}>New Event</Button>
            </div>
            <div className="generic-main-panel">


              {
                (story.events.length == 0) && (<div className="empty-main-panel">No events!</div>)
              }

              {
                ((story.events.length > 0) && selectedEvent) && (
                  <div className="generic-main-scroller">

                    <h2>Name</h2>
                    <h6>The name of your event</h6>
                    <FormControl className="no-flex-shrink" value={selectedEvent.name} onChange={(e)=>{
                      selectedEvent.name = e.currentTarget.value;
                      Core.dispatchEvent("event-info-changed", selectedEvent);
                    }}></FormControl>

                    <div className="h-spacer"></div>


                    <h2>Tags</h2>
                    <h6>Any tags you wish to associate with this event</h6>
                    <TagBar target={selectedEvent}/>

                    <div className="h-spacer"></div>


                    <h2>Description</h2>
                    <h6>A brief summary of your event</h6>
                    <textarea value={selectedEvent.desc} className="synopsis-textarea" onChange={(e)=>{
                      selectedEvent.desc = e.currentTarget.value;
                      Core.dispatchEvent("event-info-changed", selectedEvent);
                    }}>
                    </textarea>

                    <div className="h-spacer"></div>


                    <h2>Notes</h2>
                    <h6>Any notes you wish to make about this event</h6>
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

export default ViewEvents;
