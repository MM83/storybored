import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Overview from './View_Overview';
import NavBar from './View_Navbar';

export default function ViewApp(props)
{
  return (<div className="application-container">
    <NavBar/>
    <HashRouter>
      <Route path="/overview" component={Overview}/>
    </HashRouter>
  </div>);
}
