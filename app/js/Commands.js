import Core from './Core';
import React from 'react';
import DataModel from './DataModel';
import { Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';

export default new function Commands()
{



    Core.addCommand("create-tag", (data)=>{
      let tag = {
        name  : data.name,
        desc  : data.desc,
        color : data.color,
        guid  : Core.getUID(),
        searchModifiers : {
          notes : true
        }
      };
      DataModel.story.tags.push(tag);
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
              let tags = DataModel.story.tags;
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
      DataModel.story.characters.push(char);
      DataModel.story.selectedCharacter = DataModel.story.characters.length - 1;
      Core.dispatchEvent("character-created", char);
    });

    Core.addCommand("select-character", (index) => {
      DataModel.story.selectedCharacter = index;
      Core.dispatchEvent("character-selected", DataModel.story.characters[index]);
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


}
