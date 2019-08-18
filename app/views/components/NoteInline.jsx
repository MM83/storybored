import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../../js/Core';

class NoteInline extends React.Component {

  constructor(props)
  {
    super(props);
  }

  removeFromTarget()
  {
    // Core.exec("remove-tag-from-target", {
    //   tag : this.props.tag,
    //   target : this.props.target
    // });
  }

  removeFromStory()
  {
    // Core.exec("delete-tag", this.props.tag);
  }

  editTag()
  {
    // Core.exec("edit-tag", this.props.tag);
  }


  render() {

      console.log("I AM RENDERING THIS");

      let note = this.props.note;
      return (
        <div className="note-list-note">
          <div className="note-top-bar">
            <div className="note-top-bar-title">{note.name}</div>
            <Button>Edit</Button>
            <Button onClick={()=>{
              note.expandedOnParent = !note.expandedOnParent;
              Core.dispatchEvent("note-expanded", note);
            }}>Expand</Button>
            <Button>Delete</Button>
          </div>
          {
           note.expandedOnParent && (<div className="note-text">{note.text}</div>)
        }
        </div>);


  }

}

export default NoteInline;
