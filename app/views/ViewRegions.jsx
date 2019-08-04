import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../js/Core';
import GenericListItem from './components/GenericListItem';
import NoteList from './components/NoteList';
import TagList from './components/TagList';
import TagBar from './components/TagBar';

class ViewRegions extends React.Component {

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
    Core.addEventListener("region-created", this.stateChange);
    Core.addEventListener("region-selected", this.stateChange);
    Core.addEventListener("region-info-changed", this.stateChange);
  }

  componentWillUnmount()
  {
    Core.removeEventListener("region-created", this.stateChange);
    Core.removeEventListener("region-selected", this.stateChange);
    Core.removeEventListener("region-info-changed", this.stateChange);
  }


  render() {

      let story = Core.query("get-story");
      let selectedRegion = story.regions[story.selectedRegion];

      return (
        <div className="app-panel">
          <div className="generic-panel">
            <div className="generic-list">
              <h2>Regions</h2>
              <h6>Groups of locations (eg towns, nations)</h6>
              <div className="generic-list-expander">
                <div className="generic-list-scroller">
                  {
                      story.regions.map((item, index)=>{
                        return (<GenericListItem type="region" index={index} item={item} key={index} selected={index == story.selectedRegion}/>)
                      })
                  }
                </div>
              </div>
              <Button className="generic-new-button" onClick={ ()=>{
                  Core.exec("create-region");
                }}>New Region</Button>
            </div>
            <div className="generic-main-panel">


              {
                (story.regions.length == 0) && (<div className="empty-main-panel">No regions!</div>)
              }

              {
                ((story.regions.length > 0) && selectedRegion) && (
                  <div className="generic-main-scroller">

                    <h2>Name</h2>
                    <h6>The name of your region</h6>
                    <FormControl className="no-flex-shrink" value={selectedRegion.name} onChange={(e)=>{
                      selectedRegion.name = e.currentTarget.value;
                      Core.dispatchEvent("region-info-changed", selectedRegion);
                    }}></FormControl>

                    <div className="h-spacer"></div>

                    <h2>Tags</h2>
                    <h6>Any tags you wish to associate with this region</h6>
                    <TagBar target={selectedRegion}/>

                    <div className="h-spacer"></div>


                    <h2>Description</h2>
                    <h6>A brief summary of your region</h6>
                    <textarea value={selectedRegion.desc} className="synopsis-textarea" onChange={(e)=>{
                      selectedRegion.desc = e.currentTarget.value;
                      Core.dispatchEvent("region-info-changed", selectedRegion);
                    }}>
                    </textarea>

                    <div className="h-spacer"></div>


                    <h2>Notes</h2>
                    <h6>Any notes you wish to make about this region</h6>
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

export default ViewRegions;
