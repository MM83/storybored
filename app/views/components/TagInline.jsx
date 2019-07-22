import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../../js/Core';

class Comp extends React.Component {

  constructor(props)
  {
    super(props);
    this.editTag = this.editTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
  }

  editTag()
  {

  }

  deleteTag()
  {

  }



  render() {

      // console.log("TAGAOLOG")

      return (
        <div className="tag-inline" style={ {backgroundColor : this.props.tag.color} }>
          <div className="tag-inline-name">{this.props.tag.name}</div>
          <div className="tag-inline-options">
            <div className="tag-inline-option">Edit</div>
            <div className="tag-inline-option">Delete</div>
          </div>

        </div>

      );
  }

}

export default Comp;
