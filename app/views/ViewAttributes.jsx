import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../js/Core';
import GenericListItem from './components/GenericListItem';
import NoteList from './components/NoteList';
import TagList from './components/TagList';
import TagBar from './components/TagBar';

class ViewAttributes extends React.Component {

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
    Core.addEventListener("attribute-created", this.stateChange);
    Core.addEventListener("attribute-selected", this.stateChange);
    Core.addEventListener("attribute-info-changed", this.stateChange);
  }

  componentWillUnmount()
  {
    Core.removeEventListener("attribute-created", this.stateChange);
    Core.removeEventListener("attribute-selected", this.stateChange);
    Core.removeEventListener("attribute-info-changed", this.stateChange);
  }



  render() {

      let attr = Core.query("get-attributes");
      let list = attr.list;
      let selectedIndex = attr.selectedAttribute;
      let selected = list[selectedIndex];

      return (
        <div className="app-panel">
          <div className="generic-panel">
            <div className="generic-list">
              <h2>Attributes</h2>
              <h6>Dynamic properties of story objects</h6>
              <div className="generic-list-expander">
                <div className="generic-list-scroller">
                  {
                      list.map((item, index)=>{
                        return (<GenericListItem type="attr" index={index} item={item} key={index} selected={index == selectedIndex}/>)
                      })
                  }
                </div>
              </div>
              <Button className="generic-new-button" onClick={ ()=>{
                  Core.exec("open-new-edit-attribute", {
                    new : true
                  });
                }}>New Attribute</Button>
            </div>
            <div className="generic-main-panel">
              {
                (list.length == 0) && (<div className="empty-main-panel">No attributes!</div>)
              }
              {
                ((list.length > 0) && selected) && (
                  <div className="generic-main-scroller">
                    <h2>{selected.name}</h2>
                    {
                      (()=>{
                        let outstr = "";
                        switch(selected.type)
                        {
                          case attr.types.FloatRange:
                            outstr = "Type: Decimal";
                            if(selected.limited)
                              outstr += ", limited (min=" + selected.min + ", max=" + selected.max + ")";
                            outstr += ", default: " + selected.defaultValue;
                          break;
                          case attr.types.IntegerRange:
                            outstr = "Type: Integer";
                            if(selected.limited)
                              outstr += ", limited (min=" + selected.min + ", max=" + selected.max + ")";
                            outstr += ", default: " + selected.defaultValue;
                          break;
                          case attr.types.Set:
                            outstr += "Type: Set, options: ";
                            for(let i in selected.set)
                            {
                              outstr += selected.set[i] + "  ";
                            }
                          break;
                          case attr.types.Binary:
                            outstr += "Type: Binary, default: " + selected.defaultValue;
                          break;
                        }
                        return (<h6>{outstr}</h6>);
                      })()

                    }
                    <Button className="attr-edit-button">Edit...</Button>
                    <h2>Attribute attachments</h2>
                    <h6>None</h6>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      );
  }

}

export default ViewAttributes;
