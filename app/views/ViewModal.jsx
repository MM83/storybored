import React from 'react';
import $ from 'jquery';
import { Modal, Button } from 'react-bootstrap';
import Core from '../js/Core';

class Comp extends React.Component {

  constructor(props)
  {
    super(props);
    this.openModal  = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      open : false,
      heading : "Heading",
      body : "Body",
      buttons : [
        {
          text : "Close",
          handler : this.closeModal
        }
      ]
    };
  }

  openModal(data)
  {
    this.setState({
      open : true,
      heading : data.heading,
      body : data.body,
      buttons : data.buttons
    });
  }

  closeModal(data)
  {
    this.setState({
      open : false
    });
  }

  componentWillUnmount()
  {
    Core.removeCommand("open-modal", this.openModal);
    Core.removeCommand("close-modal", this.closeModal);
  }

  componentDidMount()
  {

    Core.addCommand("open-modal", this.openModal);
    Core.addCommand("close-modal", this.closeModal);
  }


  render() {
      return (
        <Modal show={this.state.open} onHide={()=>{}}>
        <Modal.Header>
          <Modal.Title>{this.state.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.state.body}</Modal.Body>
        <Modal.Footer>
          {
            this.state.buttons.map((item, index)=>{
              return (<Button key={index} variant={item.variant || "primary"} onClick={item.handler}>{item.text}</Button>)
            })
          }
        </Modal.Footer>
      </Modal>

      );
  }

}

export default Comp;
