import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../js/Core';
import GenericListItem from './components/GenericListItem';
import NoteList from './components/NoteList';
import TagList from './components/TagList';
import TagBar from './components/TagBar';
import AttributeBar from './components/AttributeBar';
// import DataModel from '../js/DataModel';

class ViewCharacters extends React.Component {

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
    Core.addEventListener("character-deleted", this.stateChange);
    Core.addEventListener("character-created", this.stateChange);
    Core.addEventListener("character-selected", this.stateChange);
    Core.addEventListener("character-info-changed", this.stateChange);
    Core.addEventListener("note-expanded", this.stateChange);
  }

  componentWillUnmount()
  {
    Core.removeEventListener("character-deleted", this.stateChange);
    Core.removeEventListener("character-created", this.stateChange);
    Core.removeEventListener("character-selected", this.stateChange);
    Core.removeEventListener("character-info-changed", this.stateChange);
    Core.removeEventListener("note-expanded", this.stateChange);
  }

  render() {

    // let story =

    let story = Core.query("get-story");
    let searchModifiers = story.searchModifiers.notes;
    let selectedCharacter = story.characters[story.selectedCharacter];


      return (
        <div className="app-panel">
          <div className="generic-panel">
            <div className="generic-list">
              <h2>Characters</h2>
              <h6>The characters in your story</h6>
              <div className="generic-list-expander">
                <div className="generic-list-scroller">
                {
                    story.characters.map((item, index)=>{
                      return (<GenericListItem type="char" index={index} item={item} key={index} selected={index == story.selectedCharacter}/>)
                    })
                }
                </div>
              </div>
              <Button className="generic-new-button" onClick={ ()=>{
                  Core.exec("create-character");
                }}>New Character</Button>
            </div>
            <div className="generic-main-panel">

              {
                (story.characters.length == 0) && (<div className="empty-main-panel">No characters!</div>)
              }

              {
                ((story.characters.length > 0) && selectedCharacter) && (
                  <div className="generic-main-scroller">

                    <h2>Name</h2>
                    <h6>The name of your character</h6>
                    <FormControl className="no-flex-shrink" value={selectedCharacter.name} onChange={(e)=>{
                      selectedCharacter.name = e.currentTarget.value;
                      Core.dispatchEvent("character-info-changed", selectedCharacter);
                    }}></FormControl>

                    <div className="h-spacer"></div>


                    <h2>Tags</h2>
                    <h6>Any tags you wish to associate with this character</h6>
                    <TagBar target={selectedCharacter} visProp={"tagsOpen"} category="notes" />

                    <div className="h-spacer"></div>

                    <h2>Attributes</h2>
                    <h6>Any attributes you wish this character to have</h6>
                    <AttributeBar  target={selectedCharacter}/>

                    <div className="h-spacer"></div>


                    <h2>Description</h2>
                    <h6>A brief summary of your character</h6>
                    <textarea value={selectedCharacter.desc} className="synopsis-textarea" onChange={(e)=>{
                      selectedCharacter.desc = e.currentTarget.value;
                      Core.dispatchEvent("character-info-changed", selectedCharacter);
                    }}>
                    </textarea>

                    <div className="h-spacer"></div>


                    <h2>Notes</h2>
                    <h6>Any notes you wish to make about this character</h6>
                    <NoteList target={selectedCharacter}/>

                  </div>
                )
              }



            </div>
          </div>
        </div>

      );
  }

}

export default ViewCharacters;
