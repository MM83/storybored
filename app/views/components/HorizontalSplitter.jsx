import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../../js/Core';

class HorizontalSplitter extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      divide : 0.5,
      dragging : false,
      lastY : 0
    };
    this.containerRef = React.createRef();
    this.barRef = React.createRef();
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseDrag = this.mouseDrag.bind(this);
  }

  mouseUp(e)
  {
    this.state.dragging = false;
  }

  mouseDown(e)
  {
    this.state.dragging = true;
    this.state.lastY = e.pageY;
  }

  mouseDrag(e)
  {

    if(!this.state.dragging)
      return;

    let t = this.containerRef.current.offsetHeight;
    let p = Math.max(0.1, Math.min(0.9, e.clientY / t));

    this.setState({
      divide : p
    });



    this.state.lastY = e.pageY;

  }

  componentDidMount()
  {
    window.addEventListener("mouseup", this.mouseUp);
    window.addEventListener("mousemove", this.mouseDrag);
  }

  componentWillUnmount()
  {
    window.removeEventListener("mouseup", this.mouseUp);
    window.removeEventListener("mousemove", this.mouseDrag);
  }

  render() {

    let topStyle = {
      height : (this.state.divide * 100).toFixed(2) + "%"
    };

    let oh = this.barRef.current ? this.barRef.current.offsetHeight : 0;

    let percString = ((100) - this.state.divide * 100).toFixed(2) + "%";

    let bottomStyle = {
      height : "calc(" + percString + " - " + oh + "px)"
    };

      return (
        <div className="h-split" ref={this.containerRef}>
          <div className="h-split-panel hsp0" style={topStyle}>
            { this.props.children[0] }
          </div>
          <div className="h-split-bar" ref={this.barRef} onMouseDown={(e)=>{
            this.mouseDown(e);
          }}></div>
        <div className="h-split-panel hsp1" style={bottomStyle}>
            { this.props.children[1] }
          </div>
        </div>

      );
  }

}

export default HorizontalSplitter;
