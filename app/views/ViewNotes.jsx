import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import GenericListItem from './components/GenericListItem';
import FilterList from './components/FilterList';
import DataModel from '../js/DataModel';

class ViewNotes extends React.Component {

  constructor(props)
  {
    super(props);
    //<Route path="/home" component={ViewHome}/>
  }

  componentDidMount()
  {
  }


  render() {



      return (
        <div className="app-panel">
          <div className="generic-panel">
            <div className="generic-list">
              <h2>Notes</h2>
              <FilterList/>
              <div className="generic-list-expander">
                <div className="generic-list-scroller">
                  <GenericListItem title="My note 1" selected={true}/>
                  <GenericListItem title="My note 1"/>
                  <GenericListItem title="My note 1"/>
                  <GenericListItem title="My note 1"/>
                  <GenericListItem title="My note 1"/>
                  <GenericListItem title="My note 1"/>
                  <GenericListItem title="My note 1"/>
                  <GenericListItem title="My note 1"/>
                  <GenericListItem title="My note 1"/>
                  <GenericListItem title="My note 1"/>
                  <GenericListItem title="My note 1"/>
                  <GenericListItem title="My note 1"/>
                </div>
              </div>
              <Button className="generic-new-button">New Note</Button>
            </div>
          </div>
        </div>

      );
  }

}

export default ViewNotes;
