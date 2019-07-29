import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import ListItemInline from '../components/ListItemInline';
import Core from '../../js/Core';

class CreateEditAttribute extends React.Component {

  constructor(props)
  {
    super(props);
    this.addListItem = this.addListItem.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
    this.createAttribute = this.createAttribute.bind(this);
    this.state = {
      name : "",
      defaultValue: 0,
      defaultBin : true,
      typeIndex : 0,
      limited : false,
      min : 0,
      max : 9999,
      newTagText : "",
      prev : {
        max : 9999, min : 0, defaultValue : 0
      },
      listItems : []
    };
  }

  removeListItem(index)
  {
    this.state.listItems.splice(index, 1);
    this.setState({});
  }

  addListItem(item)
  {
    this.state.listItems.push(item);
    this.setState({});
  }

  createAttribute()
  {
    Core.exec("create-attribute", this.state);
  }

  componentDidMount()
  {
    this.state.prev = {
      max : 9999, min : 0, defaultValue : 0
    }
    this.state.min = 0;
    this.state.max = 9999;
    this.state.value = 0;
    Core.addCommand("remove-item-from-list", this.removeListItem);
    Core.addCommand("add-item-to-list", this.addListItem);
    Core.addCommand("create-attribute-from-view", this.createAttribute);
  }

  componentWillUnmount()
  {
    Core.removeCommand("remove-item-from-list", this.removeListItem);
    Core.removeCommand("add-item-to-list", this.addListItem);
    Core.removeCommand("create-attribute-from-view", this.createAttribute);
  }


  render() {

      let typeLabels = [
        "Decimal", "Integer", "Binary", "List"
      ];
      let typeDescriptions = [
        "A decimal number", "A whole number", "A simple true/false value", "A set of possible values"
      ];


      //Store for comparison

      this.state.max = +this.state.max;
      this.state.min = +this.state.min;
      this.state.defaultValue = +this.state.defaultValue;

      if(this.state.min > this.state.max)
        this.state.min = this.state.max;

      if(this.state.max < this.state.min)
        this.state.max = this.state.min;

      if(this.state.typeIndex == 1)
      {
        this.state.max = Math.round(this.state.max);
        this.state.min = Math.round(this.state.min);
        this.state.defaultValue = Math.round(this.state.defaultValue);
      }

      if(this.state.limited)
      {
        if(this.state.defaultValue > this.state.max)
          this.state.defaultValue = this.state.max;
        if(this.state.defaultValue < this.state.min)
          this.state.defaultValue = this.state.min;
      }

      this.state.prev.max = this.state.max;
      this.state.prev.min = this.state.min;
      this.state.prev.defaultValue = this.state.defaultValue;

      let isNumeric = this.state.typeIndex < 2;
      let isBinary  = this.state.typeIndex == 2;

      return (
        <div className="modal-create-new-attr">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Name</InputGroup.Text>
            </InputGroup.Prepend>
              <FormControl onChange={(e)=>{
                  this.setState({
                    name : e.target.value
                  })
                }} value={this.state.name}></FormControl>
          </InputGroup>

          <div className="h-spacer"></div>

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Type</InputGroup.Text>
            </InputGroup.Prepend>
              <div className="modal-attr-desc">{ typeDescriptions[this.state.typeIndex] }</div>

            <DropdownButton
              as={InputGroup.Append}
              title={ typeLabels[this.state.typeIndex] }
              id="input-group-dropdown-2"
              onSelect={
                (k)=>{
                  this.setState({
                    typeIndex : k
                  })
                }
              }
            >
              <Dropdown.Item eventKey={0}>Decimal</Dropdown.Item>
              <Dropdown.Item eventKey={1}>Integer</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey={2}>Binary</Dropdown.Item>
              <Dropdown.Item eventKey={3}>List</Dropdown.Item>
            </DropdownButton>

          </InputGroup>

          {
            isNumeric && (<div className="attr-modal-section">
            <div className="h-spacer"></div>

            <InputGroup>

              <InputGroup.Prepend>
                <InputGroup.Text>Limited</InputGroup.Text>
                <InputGroup.Checkbox onChange={()=>{
                  this.setState({
                    limited : !this.state.limited
                  })
                }} checked={this.state.limited}  />
              </InputGroup.Prepend>

              <InputGroup.Prepend>
                <InputGroup.Text>Min</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl disabled={!this.state.limited} type="number" onChange={(e)=>{
                this.setState({
                  min : e.target.value
                })
              }} value={this.state.limited ? this.state.min : ""}/>

              <InputGroup.Prepend>
                <InputGroup.Text>Max</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl disabled={!this.state.limited} type="number" onChange={(e)=>{
                this.setState({
                  max : e.target.value
                })
              }} value={this.state.limited ? this.state.max : ""}/>


            </InputGroup>

            <div className="h-spacer"></div>

            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Default Value</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl type="number" onChange={(e)=>{
                this.setState({
                  defaultValue : e.target.value
                });
              }} value={this.state.defaultValue} />
            </InputGroup>




          </div>)
        }

          {isBinary && (<div className="attr-modal-section">

            <div className="h-spacer"></div>

            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Default Value</InputGroup.Text>
              </InputGroup.Prepend>
              <DropdownButton
                as={InputGroup.Append}
                onSelect={(k)=>{
                  this.setState({
                    defaultBin : k === "1"
                  })
                }}
                title={this.state.defaultBin ? "True" : "False"}
                id="input-group-dropdown-2"
              >
                <Dropdown.Item eventKey={1}>True</Dropdown.Item>
                <Dropdown.Item eventKey={0}>False</Dropdown.Item>
              </DropdownButton>
            </InputGroup>

          </div>)}

          {(this.state.typeIndex == 3) && (<div className="attr-modal-section">

            <div className="h-spacer"></div>

            <div className="tag-form-input">
            {
              this.state.listItems.map((item, index)=>{
                return (<ListItemInline key={index} index={index} name={item}/>);
              })
            }
            </div>

            <div className="h-spacer"></div>

            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>New Item</InputGroup.Text>

              </InputGroup.Prepend>
              <FormControl onChange={(e)=>{
                this.state.newTagText = e.target.value;
                this.setState({});
              }} value={this.state.newTagText}/>
              <InputGroup.Append>
                <Button onClick={()=>{
                  if(this.state.newTagText.length > 0)
                  {
                    let newItem = this.state.newTagText;
                    this.state.newTagText = "";
                    Core.exec("add-item-to-list", newItem);
                  }
                }}>Add</Button>
              </InputGroup.Append>
            </InputGroup>

          </div>)}


        </div>

      );
  }

}

export default CreateEditAttribute;
