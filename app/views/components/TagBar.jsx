import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import TagInline from './TagInline';
import DataModel from '../../js/DataModel';//TODO - Remove this dependency
import Core from '../../js/Core';

class Comp extends React.Component {

  constructor(props)
  {
    super(props);
    //<Route path="/home" component={ViewHome}/>
    this.createTag = this.createTag.bind(this);
    this.addTagToTarget = this.addTagToTarget.bind(this);
    this.tagCreated = this.tagCreated.bind(this);

  }

  tagCreated()
  {
    this.setState({});
  }

  componentDidMount()
  {
    Core.addEventListener("tag-created", this.tagCreated);
  }

  componentWillUnmount()
  {
    Core.removeEventListener("tag-created", this.tagCreated);
  }

  createTag()
  {

    let name = React.createRef();
    let desc = React.createRef();

    let createUI = (
      <div className="modal-create-new-tag">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Name</InputGroup.Text>
          </InputGroup.Prepend>
            <FormControl ref={name}></FormControl>
        </InputGroup>
        <div className="h-spacer"></div>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Description</InputGroup.Text>
          </InputGroup.Prepend>
            <FormControl ref={desc}></FormControl>
        </InputGroup>
      </div>);

    Core.exec("open-modal", {
      heading : "Create new tag",
      body : createUI,
      buttons : [
        {
          text : "Create",
          handler : () => {
            Core.exec("create-tag", {
              name : name.current.value,
              desc : desc.current.value,
              color : "#ff9900"
            });
            Core.exec("close-modal");
          }
        },{
          text : "Cancel",
          handler : ()=>{
            Core.exec("close-modal");
          }
        }
      ]
    });
  }

  addTagToTarget()
  {
    console.log("ADD TAG");
  }


  render() {

      let story = DataModel.story;
      let tags = [];


      switch (this.props.target) {
        case "all"://Here, we just show all tags indiscriminately from the root
          tags = story.tags;
          break;
      }

      let createTag = (this.props.target == "all");

      let buttonLabel = createTag ? "Create Tag" : "Add Tag";
      let buttonHandler = createTag ? this.createTag : this.addTagToTarget;

      console.log("i like tags", tags);

      return (
        <div className="tag-form-input">
          {
            tags.map((item, index)=>{
              return (<TagInline tag={item} key={index}/>);
            })
          }
          <Button onClick={buttonHandler} className="new-tag-button">{buttonLabel}...</Button>
        </div>

      );
  }

}

export default Comp;
