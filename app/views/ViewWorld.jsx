import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Core from '../js/Core';
import MapListItem from './components/MapListItem';
import ImgSrc from '../assets/images/map.jpg';
const OrbitControls = require('three-orbitcontrols');
import
{
  Camera, Scene, WebGLRenderer, PerspectiveCamera, PlaneGeometry,
  CubeGeometry, MeshPhysicalMaterial, Mesh, PointLight, MeshPhongMaterial, MeshBasicMaterial,
  Shape, ExtrudeGeometry
} from 'three';


class ViewWorld extends React.Component {

  constructor(props)
  {
    super(props);
    this.containerRef = React.createRef();
    this.canvasRef = React.createRef();

  }

  componentDidMount() {
    let cRef = this.containerRef.current;
    this.camera = new PerspectiveCamera( 45, cRef.offsetWidth / cRef.offsetHeight, 0.1, 1000 );
    this.scene = new Scene();

    this.mesh = new Mesh
    (
      new PlaneGeometry(1000, 1000, 30, 30),
      new MeshPhysicalMaterial
      (
        {
          color : 0xFFFFFF,
          // wireframe: true
        }
      )
    );
    this.light = new PointLight( 0xffffff, 1, 1000, 2);
    this.light.position.set(20, 100, 40);
    this.scene.add(this.light);
    this.mesh.position.set(0, 0, 0);
    this.mesh.rotation.set(-Math.PI/2, 0, 0);
    this.scene.add(this.mesh);

    let cube = new Mesh(new CubeGeometry(2, 2, 2), new MeshPhysicalMaterial({ color : 0xaf3fff }));
    this.scene.add(cube);

    this.camera.position.z = 10;
    this.camera.position.y = 3;
    this.renderer = new WebGLRenderer({
      canvas : this.canvasRef.current
    });
    this.domElement = this.renderer.domElement;
    this.mounted = true;
    let r = this.renderer;

    var heartShape = new Shape();

heartShape.moveTo( 25, 25 );
heartShape.lineTo( 25, 25, 20, 0, 0, 0 );
heartShape.lineTo( 30, 0, 30, 35,30,35 );
heartShape.lineTo( 30, 55, 10, 77, 25, 95 );
heartShape.lineTo( 60, 77, 80, 55, 80, 35 );
heartShape.lineTo( 80, 35, 80, 0, 50, 0 );
heartShape.lineTo( 35, 0, 25, 25, 25, 25 );

var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

var geometry = new ExtrudeGeometry( heartShape, extrudeSettings );

var mesh = new Mesh( geometry, new MeshPhysicalMaterial() );
this.scene.add(mesh);

    // var controls = new OrbitControls( this.camera, this.domElement );
    const controls = new OrbitControls(this.camera, this.domElement)
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    // controls.enableZoom = false;

    let f = ()=>{
      if(this.mounted){
        r.render(this.scene, this.camera);
        requestAnimationFrame(f);
      }
    }
    f();
  }

  componentWillUnmount()
  {
    this.mounted = false;
  }


  render() {

      let story = Core.query("get-story");

      let stageStyle = {
        position: "absolute"
      }

      return (
        <div className="app-panel">
          <div className="generic-panel">

            <div ref={this.containerRef} className="world-container">

              <canvas ref={this.canvasRef} className="world-canvas" width="800" height="600"></canvas>

            </div>
          </div>
        </div>
      );
  }

}

export default ViewWorld;
