import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import NoteListItem from './NoteListItem';
import Core from '../../js/Core';

class NoteList extends React.Component {

  constructor(props)
  {
    super(props);
    //<Route path="/home" component={ViewHome}/>
  }



  render() {
      return (
        <div className="note-list-container">
          <NoteListItem/>
          <Button className="add-new-note-button" onClick={()=>{
              Core.exec("create-note", {

              });
            }}>Add new note...</Button>
        </div>

      );
  }

}

export default NoteList;
