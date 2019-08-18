import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../../js/Core';

class NoteInline extends React.Component {

  constructor(props)
  {
    super(props);

    let note = this.props.note;

    this.state = {
      oldName : note.name,
      oldText : note.text,
      newText : note.text,
      newName : note.name,
    };
    this.noteDeleted = this.noteDeleted.bind(this);
  }

  noteDeleted(note)
  {
    console.log("NOTE DELEYTORD", note);
    this.setState({});
  }

  componentDidMount()
  {
    let note = this.props.note;
    this.state.oldName = note.name;
    this.state.oldText = note.text;
    this.state.newName = note.name;
    this.state.newText = note.text;
    Core.addEventListener("note-deleted", this.noteDeleted);
  }

  componentWillUnmount()
  {
  Core.removeEventListener("note-deleted", this.noteDeleted);
  }


  render() {

      let note = this.props.note;
      let state = this.state;
      let needsSaving = (state.newText != state.oldText) || (state.newName != state.oldName);

      return (
        <div className="note-list-note">
          <div className="note-top-bar">

          {
            note.expandedOnParent ? (
              <input className="note-top-input" type="text" value={this.state.newName} onChange={(e)=>{
                this.setState({
                  newName : e.target.value
                });
              }}/>)
              :
              (<div className="note-top-bar-title">{this.state.newName}</div>)
          }


            <Button onClick={()=>{
              note.expandedOnParent = !note.expandedOnParent;
              Core.dispatchEvent("note-expanded", note);
            }}>{note.expandedOnParent ? "Hide" : "Expand"}</Button>
            <Button onClick={()=>{
              Core.exec("open-modal", {
                heading : "Delete Note",
                body : "Are you sure you wish to delete " + note.name + "?",
                buttons : [
                  {
                    text : "Cancel",
                    handler : ()=>{
                      Core.exec("close-modal");
                    }
                  },{
                    text : "Delete",
                    handler : ()=>{
                      Core.exec("delete-note", note);
                      Core.exec("close-modal");

                    }
                  }
                ]
              });
            }}>Delete</Button>
          </div>
          {
           note.expandedOnParent && (
             <div className="note-expanded">
              <textarea className="note-expanded-text" value={this.state.newText} onChange={(e)=>{
                this.setState({
                  newText : e.target.value
                })
              }}>

              </textarea>
              {
                needsSaving && (<div className="note-expanded-buttons">
                  <Button onClick={()=>{
                    this.setState({
                      newName : this.state.oldName,
                      newText : this.state.oldText
                    })
                  }}>Revert</Button>


                  <Button onClick={()=>{
                    note.text = this.state.newText;
                    note.name = this.state.newName;
                    this.setState({
                      newText : this.state.newText,
                      oldText : this.state.newText,
                      newName : this.state.newName,
                      oldName : this.state.newName
                    });
                    Core.dispatchEvent("note-updated", note);
                  }}>Update</Button>

                </div>)
              }

             </div>
           )
          }
        </div>);


  }

}

export default NoteInline;
