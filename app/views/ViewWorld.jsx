import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import Core from '../js/Core';
import MapListItem from './components/MapListItem';
import ImgSrc from '../assets/images/map.jpg';
import MapTex from '../assets/images/maptex.jpg';
import Create from '../js/create';

class ViewWorld extends React.Component {

  constructor(props)
  {
    super(props);
    this.containerRef = React.createRef();
    this.canvasRef = React.createRef();

    this.drawWorld = this.drawWorld.bind(this);

    this.state = {
      region : 0,
      location : 0,
      lastClickRegion : false,
      drawingRegion : false
    };

    this.regionMap = {};


  }

  clickRegion()
  {
    console.log("FASSO", this.regionIndex);
  }

  drawWorld()
  {

      let story = Core.query("get-story");
      let map = this.regionMap;
      let regions = story.regions;
      let rl = regions.length;
      let stage = this.stage;
      let state = this.state;

      for(let i = 0; i < rl; ++i)
      {

        let region = regions[i];
        let hadData = !!map[region.guid];

        let data = map[region.guid] = map[region.guid] || {
          shape : new createjs.Shape(),
          text : new createjs.Text("SHIT", "120px Arial", "white")
        }

        let text = data.text;
        let shape = data.shape;
        let graphics = shape.graphics;


        if(!hadData)
        {
          shape.onClick = ()=>
          {
            this.state.region = i;
            this.state.lastClickRegion = true;
            this.setState({});
            this.drawWorld();
          }
          shape.addEventListener("click", shape.onClick);
        }

        stage.addChild(shape);
        stage.addChild(text);
        graphics.clear();
        graphics.beginFill(region.color);



        let minX = 0, minY = 0, maxX = 0, maxY = 0;

        switch(region.shapeType)
        {
          case "polygon":
            let border = region.border;
            let bl = border.length;

            for(let j = 0; j < bl; ++j)
            {
              let bp = border[j];

              //if first, set mins and maxes
              if(j == 0)
              {
                minX = maxX = bp[0];
                minY = maxY = bp[1];
              }

              minX = Math.min(minX, bp[0]);
              maxX = Math.max(maxX, bp[0]);

              minY = Math.min(minY, bp[1]);
              maxY = Math.max(maxY, bp[1]);
              (j == 0) ? graphics.moveTo(bp[0], bp[1]) : graphics.lineTo(bp[0], bp[1]);
            }

          break;
          case "circle":

            graphics.drawCircle(0, 0, region.radius);
            minX = maxX = shape.x = region.position[0];
            minY = maxY = shape.y = region.position[1];

          break;
        }

        let xDiff = (maxX - minX) / 2;
        let yDiff = (maxY - minY) / 2;

        text.x = minX + xDiff;
        text.y = minY + yDiff;

        text.text = region.name;
        text.shadow = new createjs.Shadow("#000000", 5, 5, 5);

        graphics.endFill();


        let selected = (state.region == i) && state.lastClickRegion;
        shape.alpha = selected ? 1 : 0.5;


      }

      console.log("ctex", this.canvasTexture);

      if(this.mapMaterial){
        this.mapMaterial.needsUpdate = true;
        // console.log("DONE CULB");
      }

      this.stage.update();

  }

  componentDidMount() {

    let stage = this.stage = new createjs.Stage(this.canvasRef.current);

    let bgShape = new createjs.Shape();

    bgShape.graphics.beginFill("#222");
    bgShape.graphics.drawRect(0, 0, 4096, 4096);
    stage.addChild(bgShape);

    this.drawWorld();

  }

  componentWillUnmount()
  {
    this.mounted = false;
  }


  render() {

      let story = Core.query("get-story");
      let state = this.state;

      let stageStyle = {
        position: "absolute"
      }

      return (
        <div className="app-panel">
          <div className="generic-panel">

            <div className="world-and-timeline">
              <div ref={this.containerRef} className="world-container">
                <div className="world-scroller">
                  <canvas ref={this.canvasRef} className="world-canvas" width="4096" height="4096"></canvas>
                </div>
              </div>
              <div className="timeline-container">
                <div className="timeline-options">
                  <InputGroup size="sm">
                    <InputGroup.Prepend>
                      <InputGroup.Text>Length</InputGroup.Text>
                    </InputGroup.Prepend>
                      <FormControl></FormControl>
                      <Button>Rescale</Button>
                  </InputGroup>

                </div>
              </div>
            </div>

            <div className="world-panel">

              <DropdownButton className="world-panel-theme" size="sm"
                as={InputGroup.Append}
                title="Sketch"
                id="input-group-dropdown-2">
                <Dropdown.Item eventKey={1}>Cyberpunk</Dropdown.Item>
                <Dropdown.Item eventKey={1}>Dystopian</Dropdown.Item>
                <Dropdown.Item eventKey={1}>Fantasy</Dropdown.Item>
                <Dropdown.Item eventKey={1}>Futuristic</Dropdown.Item>
                <Dropdown.Item eventKey={0}>Medieval</Dropdown.Item>
                <Dropdown.Item eventKey={0}>Sketch</Dropdown.Item>
              </DropdownButton>

              <h1>Regions</h1>
              {
                story.regions.map((item, index)=>{
                  if(index == state.region && state.lastClickRegion)
                    return (

                      <div  key={index} className="world-edit-block">
                        <div className="world-edit-title" key={index}>{item.name}</div>
                        <div className="world-edit-buttons">
                          <Button size="sm">Focus</Button>
                          <Button size="sm" onClick={()=>{}}>Draw</Button>
                          <Button size="sm">Delete</Button>
                        </div>
                      </div>

                    );
                  return(<a onClick={()=>{
                    this.state.region = index;
                    this.state.lastClickRegion = true;
                    this.setState({});
                    this.drawWorld();
                  }} key={index}>{item.name}</a>)
                })
              }
              <h1>Locations</h1>
                {
                  story.locations.map((item, index)=>{
                    if(index == state.location && !state.lastClickRegion)
                      return (

                        <div  key={index} className="world-edit-block">
                          <div className="world-edit-title" key={index}>{item.name}</div>
                          <div className="world-edit-buttons">
                            <Button size="sm">Focus</Button>
                            <Button size="sm">Edit</Button>
                            <Button size="sm">Draw</Button>
                            <Button size="sm">Delete</Button>
                          </div>
                        </div>

                      );
                    return(<a onClick={()=>{
                      this.state.location = index;
                      this.state.lastClickRegion = false;
                      this.setState({});
                      this.drawWorld();
                    }} key={index}>{item.name}</a>)
                  })
                }
              <h1>Terrain</h1>
            </div>
          </div>
        </div>
      );
  }

}

export default ViewWorld;
