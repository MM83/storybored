import React from 'react';
import $ from 'jquery';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
// import DataModel from '../js/DataModel';
// import Commands from '../js/Commands';
// import { Button } from 'react-bootstrap';
// import { HashRouter, Route, Switch } from 'react-router-dom';
// import TopBar from './TopBar';
// import NavPanel from './NavPanel';
// import ViewStory from './ViewStory';
// import ViewNotes from './ViewNotes';
// import ViewCharacters from './ViewCharacters';
// import ViewEvents from './ViewEvents';
// import ViewLocations from './ViewLocations';
// import ViewItems from './ViewItems';
// import ViewRegions from './ViewRegions';
// import ViewAttributes from './ViewAttributes';
// import ViewWorld from './ViewWorld';
// import ViewModal from './ViewModal';

export default function ViewApp(props)
{
  return (<div>
    <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">StoryBored</Navbar.Brand>
    <Nav>
      <NavDropdown title="Project">
        <NavDropdown.Item>Save</NavDropdown.Item>
        <NavDropdown.Item>Reload</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>Branch...</NavDropdown.Item>
        <NavDropdown.Item>Tree...</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>New...</NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="Elements">
        <NavDropdown.Item>Save</NavDropdown.Item>
        <NavDropdown.Item>Reload</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>Branch...</NavDropdown.Item>
        <NavDropdown.Item>Tree...</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>New...</NavDropdown.Item>
      </NavDropdown>

    </Nav>

</Navbar>

  </div>);
}

// class ViewApp extends React.Component {
//
//   constructor(props)
//   {
//     super(props);
//     //<Route path="/home" component={ViewHome}/>
//   }
//
//
//
//   render() {
//       return (
//         <div className="main-app">
//           <TopBar/>
//
//         </div>
//
//       );
//   }
//
// }
//
// export default ViewApp;
