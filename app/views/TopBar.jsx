import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';

class ViewApp extends React.Component {

  constructor(props)
  {
    super(props);
  }



  render() {
      return (
        <div className="top-bar">
          <div className="app-logo">StoryBored</div>
            <Dropdown className="top-bar-drop" >
              <Dropdown.Toggle variant="primary-outline" className="user-dropdown">
                <div className="nav-top-bar-user-name">My Story 1</div>
              </Dropdown.Toggle>
              <Dropdown.Menu >
                <Dropdown.Item eventKey={"user"} key={0} >Save...</Dropdown.Item>
                <Dropdown.Item eventKey={"user"} key={0} >Manage history...</Dropdown.Item>
                      <Dropdown.Divider />
                <Dropdown.Item eventKey={"user"} key={0}>Load <b>"Unsure"</b>
                 - 14:52 2/7/19</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="top-bar-drop">
              <Dropdown.Toggle className="user-dropdown">
                <div className="nav-top-bar-user-name">John Smith</div>
              </Dropdown.Toggle>
              <Dropdown.Menu >
                <Dropdown.Item eventKey={"user"} key={0} >Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

        </div>

      );
  }

}

export default ViewApp;
