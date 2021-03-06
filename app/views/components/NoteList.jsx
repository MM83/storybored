import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import NoteListItem from './NoteListItem';
import NoteInline from './NoteInline';
import Core from '../../js/Core';

class NoteList extends React.Component {

  constructor(props)
  {
    super(props);
    this.stateChange = this.stateChange.bind(this);
    this.state = {
      notes : []
    };
  }

  componentDidMount()
  {
    Core.addEventListener("note-created", this.stateChange);
    Core.addEventListener("note-deleted", this.stateChange);
    // this.stateChange();
  }

  componentWillUnmount()
  {
    Core.removeEventListener("note-created", this.stateChange);
    Core.removeEventListener("note-deleted", this.stateChange);
  }

  stateChange()
  {
    this.setState({});
  }

  render() {


      let target = this.props.target;
      let targetNotes = target.notes;
      let notes = [];

      for(let i in targetNotes)
      {
        let note = Core.query("get-note", targetNotes[i]);
        if(note)
          notes.push(note);
      }

      console.log("not attack", targetNotes);

      return (
        <div className="note-list-container">
          <Button className="add-new-note-button" onClick={()=>{
              Core.exec("create-note", {
                target : target
              });
            }}>Add new note...</Button>

            {
              notes.map((item, index)=>{
                return (<NoteInline target={target} note={item} key={index}/>);
              })
            }
        </div>

      );
  }

}

export default NoteList;
