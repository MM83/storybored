import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';


export default function Overview()
{

  const [rootLocation, setRootLocation] = useState("");

  let checkLocation = (e)=>
  {
    setRootLocation(window.location.hash.split("/")[1]);
  }

  useEffect(()=>
  {
    window.addEventListener("hashchange", checkLocation);
    checkLocation();
    return () => window.removeEventListener("hashchange", checkLocation);
  })

  return (
    <React.Fragment>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">StoryBored</Navbar.Brand>
        <Nav>
          <NavDropdown title="Project">
            <NavDropdown.Item>Save</NavDropdown.Item>
            <NavDropdown.Item>Revert...</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Branch...</NavDropdown.Item>
            <NavDropdown.Item>Tree...</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Open...</NavDropdown.Item>
            <NavDropdown.Item>New...</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="#/overview">Overview</Nav.Link>
          <Nav.Link href="#/entities">Entities</Nav.Link>
          <Nav.Link href="#/world">World</Nav.Link>
          <Nav.Link href="#/events">Events</Nav.Link>
        </Nav>
    </Navbar>
    <Navbar bg="sub" expand="lg" >

      {
        (rootLocation == "overview") && (
          <React.Fragment>
            <Nav.Link active href="#/overview/synopsis">Synopsis</Nav.Link>
            <Nav.Link href="#/overview/notes">Notes</Nav.Link>
            <Nav.Link href="#/overview/attributes">Attributes</Nav.Link>
          </React.Fragment>
        )
      }
      {
        (rootLocation == "entities") && (
          <React.Fragment>
            <Nav.Link active href="#/overview/synopsis">Characters</Nav.Link>
            <Nav.Link href="#/overview/notes">Items</Nav.Link>
          </React.Fragment>
        )
      }
      {
        (rootLocation == "world") && (
          <React.Fragment>
            <Nav.Link active href="#/overview/synopsis">Locations</Nav.Link>
            <Nav.Link href="#/overview/notes">Regions</Nav.Link>
            <Nav.Link href="#/overview/attributes">Lands</Nav.Link>
          </React.Fragment>
        )
      }
      {
        (rootLocation == "events") && (
          <React.Fragment>
            <Nav.Link active href="#/overview/synopsis">Synopsis</Nav.Link>
            <Nav.Link href="#/overview/notes">Notes</Nav.Link>
            <Nav.Link href="#/overview/attributes">Attributes</Nav.Link>
          </React.Fragment>
        )
      }


    </Navbar>

    </React.Fragment>)
}
