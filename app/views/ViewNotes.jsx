import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl, Dropdown, ButtonGroup } from 'react-bootstrap';
import GenericListItem from './components/GenericListItem';
import FilterList from './components/FilterList';
import TagList from './components/TagList';
import DataModel from '../js/DataModel';

class ViewNotes extends React.Component {

  constructor(props)
  {
    super(props);

    this.setByTag = this.setByTag.bind(this);
    this.setByCategory = this.setByCategory.bind(this);

    this.state = {
      byTag : DataModel.story.searchModifiers.notes.byTag
    };
  }

  setByTag()
  {
    this.setState({
      byTag : true
    });
  }

  setByCategory()
  {
    this.setState({
      byTag : false
    });
  }

  componentDidMount()
  {

    this.setState({
      byTag : DataModel.story.searchModifiers.notes.byTag
    });
  }


  render() {


      let searchModifiers = DataModel.story.searchModifiers.notes;
      let byTag = searchModifiers.byTag = this.state.byTag;

      console.log("SM", searchModifiers);

      return (
        <div className="app-panel">
          <div className="generic-panel">
            <div className="generic-list">
              <h2>Notes</h2>
              <ButtonGroup className="notes-type-bar">
                <Button onClick={this.setByCategory} variant={!byTag ? "secondary" : "primary"} className="notes-type-button">Categories</Button>
                <Button onClick={this.setByTag} variant={ byTag ? "secondary" : "primary"} className="notes-type-button">Tags</Button>
              </ButtonGroup>
              { !byTag && (<FilterList visTarget={searchModifiers} visProp={"catsOpen"} />)}
              { byTag && (<TagList visTarget={searchModifiers} visProp={"tagsOpen"} category="notes" />)}
              <div className="generic-list-expander">
                <div className="generic-list-scroller">

                </div>
              </div>
            </div>
          </div>
        </div>

      );
  }

}

export default ViewNotes;
