import React from 'react';
import $ from 'jquery';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Overview from './View_Overview';
import Navbar from './View_Navbar';

export default function ViewApp(props)
{
  return (<div className="application-container">
    <Navbar/>
    
    <HashRouter>
      <Route path="/overview" component={Overview}/>
    </HashRouter>
  </div>);
}
