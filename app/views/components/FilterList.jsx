import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

class FilterList extends React.Component {

  constructor(props)
  {
    super(props);
    this.showHide = this.showHide.bind(this);
    this.state = {
      visible : false
    };
  }

  showHide()
  {
    this.setState({
      visible : !this.state.visible
    });
  }

  render() {
      return (
        <div className="filter-list">
        <h6 onClick={this.showHide}>{this.state.visible ? "Hide filters" : "Show filters"}</h6>
        <div className="filter-list-contents" style={{
            display : (this.state.visible) ? "flex" : "none"
          }}>
            <div className="filter-list-row">
              <div className="filter-list-label">Tags</div>
              <input type="checkbox"/>
            </div>
            <div className="filter-list-row">
              <div className="filter-list-label">Characters</div>
              <input type="checkbox"/>
            </div>
            <div className="filter-list-row">
              <div className="filter-list-label">Items</div>
              <input type="checkbox"/>
            </div>
            <div className="filter-list-row">
              <div className="filter-list-label">Locations</div>
              <input type="checkbox"/>
            </div>
            <div className="filter-list-row">
              <div className="filter-list-label">Events</div>
              <input type="checkbox"/>
            </div>
            <div className="filter-list-row">
              <div className="filter-list-label">Attributes</div>
              <input type="checkbox"/>
            </div>
            <div className="filter-list-row">
              <div className="filter-list-label">Regions</div>
              <input type="checkbox"/>
            </div>
            <div className="filter-list-row">
              <div className="filter-list-label">World</div>
              <input type="checkbox"/>
            </div>

          </div>
        </div>

      );
  }

}

export default FilterList;
