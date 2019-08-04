import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../js/Core';
import MapListItem from './components/MapListItem';
import ImgSrc from '../assets/images/map.jpg';
import {
  StageComponent, BitmapComponent, ContainerComponent, ShapeComponent, TextComponent
} from "easeljs-react";

class ViewWorld extends React.Component {

  constructor(props)
  {
    super(props);
    // console.log("fubfbfs", createjs);
    //<Route path="/home" component={ViewHome}/>
    this.state = {
      image : null
    };
  }

  componentDidMount() {
  const image = new Image();
  image.src = ImgSrc;
  image.onload = () => {
    this.setState({image});
  }
}


  render() {

      let story = Core.query("get-story");

      let scrollerStyle = {
        backgroundImage : 'url("'+ ImgSrc + '")'
      }

      console.log("IMAGE", this.state.image);

      return (
        <div className="app-panel">
          <div className="generic-panel">
            <div className="generic-list">

              <div className="generic-list-expander">
                <div className="generic-list-scroller">
                  <h2>Locations</h2>
                  {
                    story.locations.map((item, index)=>{
                      return <MapListItem key={index} item={item} type="location"/>
                    })
                  }
                  <h2>Regions</h2>
                  {
                    story.regions.map((item, index)=>{
                      return <MapListItem key={index} item={item} type="region"/>
                    })
                  }
                  <h2>Annotations</h2>
                  <h2>Shapes</h2>

                </div>
              </div>

              <div className="world-toolset">
                <Button>Add Shape</Button>
                <Button>Add Annotation</Button>
                <Button>Upload Map Image</Button>
              </div>

            </div>
            <div className="world-container">

              <div className="world-scroller" style={scrollerStyle}>
                <img className="world-backing" src={ImgSrc}></img>
              </div>
            </div>
          </div>
        </div>
      );
  }

}

export default ViewWorld;
