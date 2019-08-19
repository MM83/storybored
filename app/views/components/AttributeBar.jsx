import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import TagInline from './TagInline';
import DataModel from '../../js/DataModel';//TODO - Remove this dependency
import Core from '../../js/Core';

class AttributeBar extends React.Component {

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
    Core.addEventListener("attribute-added-to-target", this.stateChange);
  }

  componentWillUnmount()
  {
    Core.removeEventListener("attribute-added-to-target", this.stateChange);
  }

//   <div className="attr-form-item">
//     <div className="attr-form-name">Health</div>
//     <div className="attr-form-label">Initial Value:</div>
//     <div className="attr-form-init-value">100</div>
//     <div className="flex-grow"></div>
//     <Button variant="outline-primary">Timeline</Button>
// </div>


  render() {

      let list = Core.query("get-attributes");
      let target = this.props.target;
      let attrs = target.attributes;

      console.log("TARGET", target);

      return (
        <div className="tag-form-input">
          <div className="attr-form-list">
            {

              attrs.map((item, index)=>{

                let base = Core.query("get-attribute-by-uid", item.ref);

                console.log("base", base);

                if(!base) return null;

                let set = [], selectedName;

                console.log("BASSO", base.type);

                switch(base.type)
                {
                  case 0://FloatRange
                  break;
                  case 1://IntegerRange
                  break;
                  case 2://Set
                    set = base.set;
                    selectedName = set[item.initialValue];
                  break;
                  case 3://Binary
                  break;
                }

                //<Dropdown.Item href="#">Separated link</Dropdown.Item>

                return (

                  <InputGroup key={index} className="attr-form-item" >
                    <InputGroup.Prepend>
                      <InputGroup.Text >{base.name}</InputGroup.Text>
                      <InputGroup.Text >Initial Value:</InputGroup.Text>

                    </InputGroup.Prepend>

                    {
                      (base.type == 0) && (<FormControl
      placeholder="Recipient's username"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />)
                    }
                    {
                      (base.type == 1) && (<FormControl
      placeholder="Recipient's username"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />)
                    }
                    {
                      (base.type == 2) &&
                      (<DropdownButton as={InputGroup.Prepend} title={selectedName}>
                          {
                            set.map((item, index)=>{
                              return (<Dropdown.Item key={index} href="#">{item}</Dropdown.Item>);
                            })
                          }

                        </DropdownButton>)
                    }
                    {
                      (base.type == 3) &&
                      (<DropdownButton as={InputGroup.Prepend} title="True">
                          <Dropdown.Item>True</Dropdown.Item>
                          <Dropdown.Item>False</Dropdown.Item>
                        </DropdownButton>)
                    }

                    <InputGroup.Append>
                      <Button variant="outline-primary">Timeline...</Button>
                      <Button variant="outline-danger">Delete</Button>
                    </InputGroup.Append>

                  </InputGroup>
                );
              })
            }
          </div>
          <Dropdown className="tag-dropdown">
            <Dropdown.Toggle id="dropdown-basic">
              Add Attribute...
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {
                list.map((item, index)=>
                {
                    return (<Dropdown.Item key={index} onClick={()=>{

                        Core.exec("add-attribute-to-target", {
                          attribute : item,
                          target : target
                        });

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
