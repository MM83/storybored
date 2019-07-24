import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../../js/Core';

class NoteListItem extends React.Component {

  constructor(props)
  {
    super(props);
    //<Route path="/home" component={ViewHome}/>
  }



  render() {
      return (
        <InputGroup className="note-list-item">
          <InputGroup.Prepend className="note-list-item-prepend">
            <InputGroup.Text style={{ width : "100%"}}>SSDKJ</InputGroup.Text>
          </InputGroup.Prepend>
          <InputGroup.Append>
            <Button className="note-button">Edit</Button>
            <Button className="note-button" variant="danger">Delete</Button>
          </InputGroup.Append>
        </InputGroup>

      );
  }

}

export default NoteListItem;
