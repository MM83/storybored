import React from 'react';
import $ from 'jquery';
import DataModel from '../js/DataModel';
import Commands from '../js/Commands';
import { Button } from 'react-bootstrap';
import { HashRouter, Route, Switch } from 'react-router-dom';
import TopBar from './TopBar';
import NavPanel from './NavPanel';
import ViewStory from './ViewStory';
import ViewNotes from './ViewNotes';
import ViewCharacters from './ViewCharacters';
import ViewEvents from './ViewEvents';
import ViewLocations from './ViewLocations';
import ViewItems from './ViewItems';
import ViewAttributes from './ViewAttributes';
import ViewModal from './ViewModal';


class ViewApp extends React.Component {

  constructor(props)
  {
    super(props);
    //<Route path="/home" component={ViewHome}/>
  }



  render() {
      return (
        <div className="main-app">
          <TopBar/>
          <div className="main-panel">
            <NavPanel/>
            <HashRouter>
              <Switch>
                <Route path="/synopsis" component={ViewStory}/>
                <Route path="/notes" component={ViewNotes}/>
                <Route path="/characters" component={ViewCharacters}/>
                <Route path="/locations" component={ViewLocations}/>
                <Route path="/events" component={ViewEvents}/>
                <Route path="/items" component={ViewItems}/>
                <Route path="/attributes" component={ViewAttributes}/>
              </Switch>
            </HashRouter>
          </div>
          <ViewModal/>
        </div>

      );
  }

}

export default ViewApp;
