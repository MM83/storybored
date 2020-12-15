import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';


export default function Overview()
{

  let checkLocation = (e)=>
  {
    console.log("I LIKE HASHES", e);
  }


  console.log("effect ors", useEffect);

  // useEffect(()=>{});

  // useEffect(()=>
  // {
  //   window.addEventListener("hashchange", checkLocation);
  //   // return () => window.removeEventListener("hashchange", checkLocation);
  // })

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
      <Nav.Link active href="#/overview/synopsis">Synopsis</Nav.Link>
      <Nav.Link href="#/overview/notes">Notes</Nav.Link>
      <Nav.Link href="#/overview/attributes">Attributes</Nav.Link>
    </Navbar>

    </React.Fragment>)
}
