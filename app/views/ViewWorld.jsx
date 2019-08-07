import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../js/Core';
import MapListItem from './components/MapListItem';
import ImgSrc from '../assets/images/map.jpg';


class ViewWorld extends React.Component {

  constructor(props)
  {
    super(props);
    this.startRegionDrag = this.startRegionDrag.bind(this);
    this.startRegionResize = this.startRegionResize.bind(this);
    this.mouseDrag = this.mouseDrag.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseDragResize = this.mouseDragResize.bind(this);
    this.mouseUpResize = this.mouseUpResize.bind(this);
    this.state = {
      isDragging : false,
      x : 0, y : 0, px : 0, py : 0
    }
  }

  componentDidMount() {

  }

  componentWillUnmount()
  {
    // createjs.Ticker.removeEventListener("tick", this.handleTick);
  }

  mouseDrag(e)
  {

    let x = e.pageX;
    let y = e.pageY;

    let dx = x - this.state.x;
    let dy = y - this.state.y;

    this.state.selectedRegion.position[0] += dy;
    this.state.selectedRegion.position[1] += dx;

    this.setState({
      x, y
    })
  }

  mouseUp()
  {
    window.removeEventListener("mousemove", this.mouseDrag);
    window.removeEventListener("mouseup", this.mouseUp);
    this.setState({
      isDragging : false
    })
  }

  mouseDragResize(e)
  {

    let x = e.pageX;
    let y = e.pageY;

    let dx = x - this.state.x;
    let dy = y - this.state.y;

    this.state.selectedRegion.radius += dx*2;

    this.setState({
      x, y
    })
  }

  mouseUpResize()
  {
    window.removeEventListener("mousemove", this.mouseDragResize);
    window.removeEventListener("mouseup", this.mouseUpResize);
    this.setState({
      isDragging : false
    })
  }

  startRegionDrag(region, mouseEvent)
  {
    this.state.isDragging = true;
    this.state.x = mouseEvent.pageX;
    this.state.y = mouseEvent.pageY;
    this.state.px = mouseEvent.pageX;
    this.state.py = mouseEvent.pageY;
    this.state.selectedRegion = region;
    this.state.dragTarget = mouseEvent.target;
    window.addEventListener("mousemove", this.mouseDrag);
    window.addEventListener("mouseup", this.mouseUp);
  }

  startRegionResize(region, mouseEvent)
  {
    this.state.isDragging = true;
    this.state.x = mouseEvent.pageX;
    this.state.y = mouseEvent.pageY;
    this.state.px = mouseEvent.pageX;
    this.state.py = mouseEvent.pageY;
    this.state.selectedRegion = region;
    this.state.dragTarget = mouseEvent.target;
    window.addEventListener("mousemove", this.mouseDragResize);
    window.addEventListener("mouseup", this.mouseUpResize);
  }

  render() {

      let startRegionDrag = this.startRegionDrag;
      let startRegionResize = this.startRegionResize;

      let story = Core.query("get-story");

      let stageStyle = {
        position: "absolute"
      }

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

              <div className="world-scroller">
                <img className="world-backing" src={ImgSrc}/>
                  <div className="world-layer world-regions">
                    {
                      story.regions.map(function(item, index){
                        let rStyle = {
                          position : "absolute",
                          top : item.position[0],
                          left : item.position[1],
                          width: item.radius / 2,
                          height: item.radius / 2
                        };

                        return (<div key={index} className="map-region" style={rStyle}
                        onMouseDown={(e)=>{
                          startRegionDrag(item, e);
                        }}
                        >
                        <div>{item.name}</div>
                        <div className="map-region-resize" onMouseDown={(e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            startRegionResize(item, e);
                          }}>
                        </div>
                      </div>);
                      })
                    }
                  </div>
              </div>


                <div className="world-layer world-labels"></div>
              </div>
            </div>

        </div>
      );
  }

}

export default ViewWorld;
