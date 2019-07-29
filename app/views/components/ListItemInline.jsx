import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../../js/Core';

class ListItemInline extends React.Component {

  constructor(props)
  {
    super(props);
    this.removeFromStory = this.removeFromStory.bind(this);

  }

  removeFromStory()
  {
    console.log("REMOVE", this.props.index);
    Core.exec("remove-item-from-list", this.props.index);
  }


  render() {


        return (
          <div className="tag-inline">
            <div className="tag-inline-name">{this.props.name}</div>
            <div className="tag-inline-options">
              <div onClick={this.removeFromStory}  className="tag-inline-delete">×</div>
            </div>
          </div>
        );



  }

}

export default ListItemInline;
