import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl, ButtonGroup } from 'react-bootstrap';
import DataModel from '../../js/DataModel';

class FilterList extends React.Component {

  constructor(props)
  {
    super(props);
    this.showHide = this.showHide.bind(this);
    this.state = {
      visible : false
    };
  }

  componentDidMount()
  {
    this.visTarget = this.props.visTarget;
    this.visProp = this.props.visProp;
    this.state.visible = this.visTarget[this.visProp];
    this.setState({});
  }

  showHide()
  {
    this.setState({
      visible : (this.visTarget[this.visProp] = !this.state.visible)
    });
  }

  render() {

      let categories = DataModel.story.searchModifiers.notes.categories;

      return (
        <div className="filter-list">
        <h6 onClick={this.showHide}>{this.state.visible ? "Hide categories" : "Show categories"}</h6>
        <div className="filter-list-contents" style={{
            display : (this.state.visible) ? "flex" : "none"
          }}>


            <ButtonGroup className="notes-type-bar">
              <Button onClick={()=>{
                  for(let i in categories)
                    categories[i] = true;
                  this.setState({});
                }} className="notes-type-button">Select All</Button>
              <Button onClick={()=>{
                  for(let i in categories)
                    categories[i] = false;
                  this.setState({});
                }} className="notes-type-button">Select None</Button>
            </ButtonGroup>

            {
              Object.keys(categories).map((item, index)=>{
                let selected = categories[item];
                return (
                  <div key={index} className="filter-list-row">
                    <div className="filter-list-label">{item}</div>
                    <input type="checkbox" checked={selected} onChange={(e)=>{
                          categories[item] = e.target.checked;
                          this.setState({});
                    }}/>
                  </div>
                );
              })

            }


          </div>
        </div>

      );
  }

}

export default FilterList;
