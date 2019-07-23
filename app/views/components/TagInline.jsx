import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../../js/Core';

class Comp extends React.Component {

  constructor(props)
  {
    super(props);
    this.removeFromTarget = this.removeFromTarget.bind(this);
    this.removeFromStory = this.removeFromStory.bind(this);
    this.editTag = this.editTag.bind(this);
  }

  removeFromTarget()
  {
    Core.exec("remove-tag-from-target", {
      tag : this.props.tag,
      target : this.props.target
    });
  }

  removeFromStory()
  {
    Core.exec("delete-tag", this.props.tag);
  }

  editTag()
  {
    Core.exec("edit-tag", this.props.tag);
  }


  render() {

      if(this.props.target)
      {
        return (
          <div className="tag-inline-property" style={ {backgroundColor : this.props.tag.color} }>
            <div className="tag-inline-name">{this.props.tag.name}</div>
            <div onClick={this.removeFromTarget} className="tag-inline-delete">×</div>
          </div>);
      } else {
        return (
          <div className="tag-inline" style={ {backgroundColor : this.props.tag.color} }>
            <div className="tag-inline-name">{this.props.tag.name}</div>
            <div className="tag-inline-options">
              <div className="tag-inline-edit" onClick={this.editTag}>Edit</div>
              <div onClick={this.removeFromStory}  className="tag-inline-delete">×</div>
            </div>
          </div>
        );
      }


  }

}

export default Comp;
