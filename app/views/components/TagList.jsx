import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl, ButtonGroup } from 'react-bootstrap';
import DataModel from '../../js/DataModel';

class TagList extends React.Component {

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
  //

  //

  render() {

      let tags = DataModel.story.tags;
      let cat = this.props.category;

      return (
        <div className="filter-list">
        <h6 onClick={this.showHide}>{this.state.visible ? "Hide tags" : "Show tags"}</h6>
        <div className="filter-list-contents" style={{
            display : (this.state.visible) ? "flex" : "none"
          }}>

          <ButtonGroup className="notes-type-bar">
            <Button className="notes-type-button" onClick={()=>{
                for(let i = 0; i < tags.length; ++i)
                  tags[i].searchModifiers[cat] = true;
                this.setState({});
              }}>Select All</Button>
            <Button className="notes-type-button" onClick={()=>{
                for(let i = 0; i < tags.length; ++i)
                  tags[i].searchModifiers[cat] = false;
                this.setState({});
              }}>Select None</Button>
          </ButtonGroup>

          <div className="h-spacer"></div>

          {
            tags.map((item, index)=>{

              let checked = item.searchModifiers[cat];

              return (
                <div key={index} className="filter-list-row">
                  <div className="filter-list-label">{item.name}</div>
                  <input type="checkbox" checked={checked} onChange={(e)=>{
                      item.searchModifiers[cat] = e.target.checked;
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

export default TagList;
