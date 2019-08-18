import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import TagInline from './TagInline';
import DataModel from '../../js/DataModel';//TODO - Remove this dependency
import Core from '../../js/Core';

class AttributeBar extends React.Component {

  constructor(props)
  {
    super(props);

  }

  stateChange()
  {
    this.setState({});
  }

  componentDidMount()
  {
  }

  componentWillUnmount()
  {
  }

  render() {

      let attr = Core.query("get-attributes");
      let list = attr.list;

      return (
        <div className="tag-form-input">
          <Dropdown className="tag-dropdown">
            <Dropdown.Toggle id="dropdown-basic">
              Add Attribute...
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {
                list.map((item, index)=>
                {
                    return (<Dropdown.Item key={index} onClick={()=>{
                        // Core.exec("add-tag-to-target", {
                        //   tag : item,
                        //   target : target
                        // });
                      }}>{item.name}</Dropdown.Item>)
                })
              }
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
  }

}

export default AttributeBar;
