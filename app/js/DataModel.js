import Core from './Core';
import React from 'react';
import { Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';

export default new function DataModel()
{
  let blankStory = {
    tags : [
      {
        name : "Sample Tag 1",
        color : "#ff9900",
        description : "This is a tag. You can use this to assign simple, common attributes",
        guid : "AAAA",
        notes : []
      },{
        name : "Sample Tag 2",
        color : "#ff9900",
        description : "This is a tag. You can use this to assign simple, common attributes",
        guid : "BBBB",
        notes : []
      },{
        name : "Sample Tag 3",
        color : "#ff9900",
        description : "This is a tag. You can use this to assign simple, common attributes",
        guid : "CCCC",
        notes : []
      }
    ],
    characters : [],
    selectedCharacter : -1
  };

  this.story = {};

  this.createNewStory = () =>
  {
    //Clone the base data
    this.story = JSON.parse(JSON.stringify(blankStory));
  }

  this.createNewStory();


  Core.addCommand("create-tag", (data)=>{
    let tag = {
      name  : data.name,
      desc  : data.desc,
      color : data.color,
      guid  : Core.getUID()
    };
    this.story.tags.push(tag);
    Core.dispatchEvent("tag-created", tag);
  });

  Core.addCommand("update-tag", (data)=>{
    let tag = data.tag;
    tag.name = data.name;
    tag.desc = data.desc;
    Core.dispatchEvent("tag-updated", tag);
  });

  Core.addCommand("edit-tag", (tag)=>{

    let nameRef = React.createRef();
    let descRef = React.createRef();

    let createUI = (
      <div className="modal-create-new-tag">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Name</InputGroup.Text>
          </InputGroup.Prepend>
            <FormControl ref={nameRef} defaultValue={tag.name}></FormControl>
        </InputGroup>
        <div className="h-spacer"></div>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Description</InputGroup.Text>
          </InputGroup.Prepend>
            <FormControl ref={descRef} defaultValue={tag.desc}></FormControl>
        </InputGroup>
      </div>);

    Core.exec("open-modal", {
      heading : "Edit Tag",
      body : createUI,
      buttons : [
        {
          text : "Update",
          handler : () => {
            let name = nameRef.current.value;
            let desc = descRef.current.value;
            Core.exec("update-tag", {
              tag, name, desc
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
  });

  Core.addCommand("delete-tag", (tag)=>{
    Core.exec("open-modal", {
      heading : "Delete tag: " + tag.name,
      body : "Are you sure? N objects will be affected.",
      buttons : [
        {
          text : "Delete",
          handler : ()=>{
            let tags = this.story.tags;
            tags.splice(tags.indexOf(tag), 1);
            Core.dispatchEvent("tag-deleted", tag);
            Core.exec("close-modal");
          }
        },{
          text : "Cancel",
          handler : ()=>{
            Core.exec("close-modal");
          }
        },
      ]
    });
  });

  Core.addCommand("create-character", ()=>{
    let char = {
      name  : "New Character",
      desc  : "",
      guid  : Core.getUID(),
      tags  : []
    };
    this.story.characters.push(char);
    this.story.selectedCharacter = this.story.characters.length - 1;
    Core.dispatchEvent("character-created", char);
  });

  Core.addCommand("select-character", (index) => {
    this.story.selectedCharacter = index;
    Core.dispatchEvent("character-selected", this.story.characters[index]);
  });

  Core.addCommand("add-tag-to-target", (data)=>{
    data.target.tags.push(data.tag.guid);
    Core.dispatchEvent("tag-added-to-target", data.target);
  });

  Core.addCommand("remove-tag-from-target", (data)=>{
    let index = data.target.tags.indexOf(data.tag.guid);
    console.log("REM INX", index);
    data.target.tags.splice(index, 1);
    Core.dispatchEvent("tag-removed-from-target", data.target);
  });

  Core.respond("get-story", ()=>{
    return this.story;
  });



}
