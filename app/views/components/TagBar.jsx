import React from 'react';
import $ from 'jquery';
import { Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
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
    this.stateChange = this.stateChange.bind(this);

  }

  stateChange()
  {
    this.setState({});
  }

  componentDidMount()
  {
    Core.addEventListener("tag-created", this.stateChange);
    Core.addEventListener("tag-updated", this.stateChange);
    Core.addEventListener("tag-deleted", this.stateChange);
    Core.addEventListener("tag-added-to-target", this.stateChange);
    Core.addEventListener("tag-removed-from-target", this.stateChange);
  }

  componentWillUnmount()
  {
    Core.removeEventListener("tag-created", this.stateChange);
    Core.removeEventListener("tag-updated", this.stateChange);
    Core.removeEventListener("tag-deleted", this.stateChange);
    Core.removeEventListener("tag-added-to-target", this.stateChange);
    Core.removeEventListener("tag-removed-from-target", this.stateChange);
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

  }


  render() {

      let story = DataModel.story;
      let target = this.props.target;

      let canCreateTags = (target == "all");

      let storyTags = story.tags;

      if(canCreateTags){
        //We're on the story page, so we can create tags and draw them directly from their objects
        return (
          <div className="tag-form-input">
            {
              storyTags.map((item, index)=>{
                return (<TagInline tag={item} key={index}/>);
              })
            }
            <Button onClick={this.createTag} className="new-tag-button">New Tag...</Button>
          </div>

        );
      } else {

        //For this, we need to iterate the list of available tags in the story itself, and see if any of these are
        //actually available/
        //<Dropdown.Item href="#/action-1">Action</Dropdown.Item>

        let targetTags = target.tags;

        let availableTags = [];

        for(let i = 0; i < storyTags.length; ++i)
        {
          let tag = story.tags[i];
          let available = true;
          inner : for(let j = 0; j < targetTags.length; ++j)
          {
            let targetTagGUID = targetTags[i];//In a target, these are stored as GUIDs only
            if(tag.guid == targetTagGUID){
              available = false;
              break inner;
            }
          }
          if(available)
            availableTags.push(tag);
        }

        return (
          <div className="tag-form-input">

            {
              targetTags.map((item, index)=>{
                let tag;

                for(let i = 0; i < storyTags.length; ++i)
                {
                  let sTag = storyTags[i];

                  if(sTag.guid == item)
                    tag = sTag;
                }
                if(tag)
                  return (<TagInline tag={tag} key={index} target={target}/>);
              })
            }

            {

            (availableTags.length > 0) && (<Dropdown className="tag-dropdown">
              <Dropdown.Toggle id="dropdown-basic">
                Add Tag
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {
                  availableTags.map((item, index)=>{
                    return <Dropdown.Item key={index} onClick={()=>{
                        Core.exec("add-tag-to-target", {
                          tag : item,
                          target : target
                        });
                      }}>{item.name}</Dropdown.Item>
                  })
                }
              </Dropdown.Menu>
            </Dropdown>)
          }

          </div>);
      }
  }

}

export default Comp;
