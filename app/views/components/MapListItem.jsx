import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../../js/Core';

class MapListItem extends React.Component {

  constructor(props)
  {
    super(props);
  }

  render() {

      let name = this.props.item.name;


      return (
        <div className={this.props.selected ? "generic-list-item-selected" : "generic-list-item"}>
          <div onClick={()=> {
              switch(this.props.type){
                case "char":
                  // Core.exec("select-character", this.props.index);
                break;
                case "item":
                  // Core.exec("select-item", this.props.index);
                break;
                case "location":
                  // Core.exec("select-location", this.props.index);
                break;
                case "event":
                  // Core.exec("select-event", this.props.index);
                break;
                case "region":
                  // Core.exec("select-region", this.props.index);
                break;
                break;
                case "attr":
                  // Core.exec("select-attribute", this.props.index);
                break;
              }
            }} className="generic-list-item-title">{name}</div>
          
        </div>

      );
  }

}

export default MapListItem;
