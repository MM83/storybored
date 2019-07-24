import React from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';

class ViewApp extends React.Component {

  constructor(props)
  {
    super(props);
  }



  render() {
      return (
        <div className="top-bar">
          <div className="app-logo">StoryBored</div>
            <Dropdown alignRight className="top-bar-drop" >
              <Dropdown.Toggle variant="primary-outline" className="user-dropdown">
                <div className="nav-top-bar-user-name">My Story 1</div>
              </Dropdown.Toggle>
              <Dropdown.Menu >
                <Dropdown.Item eventKey={"user"} key={0} >Save...</Dropdown.Item>
                <Dropdown.Item eventKey={"user"} key={1} >Manage history...</Dropdown.Item>
                      <Dropdown.Divider />
                <Dropdown.Item eventKey={"user"} key={2}>Load <b>"Unsure"</b>
                 - 14:52 2/7/19</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

        </div>

      );
  }

}

export default ViewApp;
