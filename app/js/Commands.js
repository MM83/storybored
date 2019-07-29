import Core from './Core';
import React from 'react';
import DataModel from './DataModel';
import Attributes from './Attributes';
import CreateEditAttribute from '../views/modal/CreateEditAttribute';
import { Button, InputGroup, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';

export default new function Commands()
{



    Core.addCommand("create-tag", (data)=>{
      let tag = {
        name  : data.name,
        desc  : data.desc,
        color : data.color,
        guid  : Core.getUID(),
        searchModifiers : {
          notes : true,
          characters : true,
          events : true,
          locations: true,
          regions : true
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
        tags  : [],
        notes : []
      };
      DataModel.story.characters.push(char);
      DataModel.story.selectedCharacter = DataModel.story.characters.length - 1;
      Core.dispatchEvent("character-created", char);
    });

    Core.addCommand("select-character", (index) => {
      DataModel.story.selectedCharacter = index;
      Core.dispatchEvent("character-selected", DataModel.story.characters[index]);
    });

    Core.addCommand("create-item", ()=>{
      let item = {
        name  : "New Item",
        desc  : "",
        guid  : Core.getUID(),
        tags  : [],
        notes : []
      };
      DataModel.story.items.push(item);
      DataModel.story.selectedItem = DataModel.story.items.length - 1;
      Core.dispatchEvent("item-created", item);
    });

    Core.addCommand("select-item", (index) => {
      DataModel.story.selectedItem = index;
      Core.dispatchEvent("item-selected", DataModel.story.items[index]);
    });


    Core.addCommand("create-location", ()=>{
      let location = {
        name  : "New Location",
        desc  : "",
        guid  : Core.getUID(),
        tags  : [],
        notes : []
      };
      DataModel.story.locations.push(location);
      DataModel.story.selectedLocation = DataModel.story.locations.length - 1;
      Core.dispatchEvent("location-created", location);
    });

    Core.addCommand("select-location", (index) => {
      DataModel.story.selectedLocation = index;
      Core.dispatchEvent("location-selected", DataModel.story.locations[index]);
    });



    Core.addCommand("create-event", ()=>{
      let event = {
        name  : "New Event",
        desc  : "",
        guid  : Core.getUID(),
        tags  : [],
        notes : []
      };
      DataModel.story.events.push(event);
      DataModel.story.selectedEvent = DataModel.story.events.length - 1;
      Core.dispatchEvent("event-created", event);
    });

    Core.addCommand("select-event", (index) => {
      DataModel.story.selectedEvent = index;
      Core.dispatchEvent("event-selected", DataModel.events.locations[index]);
    });





    Core.addCommand("create-region", ()=>{
      let region = {
        name  : "New Region",
        desc  : "",
        guid  : Core.getUID(),
        tags  : [],
        notes : []
      };
      DataModel.story.regions.push(region);
      DataModel.story.selectedRegion = DataModel.story.regions.length - 1;
      Core.dispatchEvent("region-created", event);
    });

    Core.addCommand("select-region", (index) => {
      DataModel.story.selectedRegion = index;
      Core.dispatchEvent("region-selected", DataModel.story.regions[index]);
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

    let noteTitleRef    = React.createRef();
    let noteContentRef  = React.createRef();

    function getNoteContent()
    {
      return (
        <div className="note-edit-container">
          <h1>Note Title</h1>
          <FormControl ref={noteTitleRef}/>
          <h1>Note</h1>
          <textarea ref={noteContentRef} className="note-edit-textarea"/>
        </div>
      );
    }



    Core.addCommand("create-note", (data)=>{
      console.log("data", data);
      Core.exec("open-modal", {
        heading : "Create Note",
        body : getNoteContent(),
        buttons : [
          {
            text : "Save Note",
            handler : ()=>{
              Core.exec("close-modal");
              let note = {
                name : noteTitleRef.current.value,
                text : noteContentRef.current.value,
                guid : Core.getUID()
              };

              //Add this note to story notes


              console.log("target", data.target, note);
              // Core.exec("add-note-to-story", {
              //   name : oteTitleRef.current.value,
              //   text : noteContentRef.current.value,
              //   target : data.target
              // });
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


    Core.addCommand("open-new-edit-attribute", (data)=>{

      Core.exec("open-modal", {
        heading : data.new ? "New Attribute" : "Edit Attribute",
        body : (<CreateEditAttribute newAttribute={true}/>),
        buttons : [
          {
            text : "Create",
            handler : () => {
              Core.exec("create-attribute-from-view");
              // Core.exec("close-modal");
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



    Core.addCommand("create-attribute", (props)=>{
      let type = Attributes.types.FloatRange;
      let defaultValue = props.defaultValue;
      switch(+props.typeIndex)
      {
        case 0:
        type = Attributes.types.FloatRange;
        break;
        case 1:
        type = Attributes.types.IntegerRange;
        break;
        case 2:
        defaultValue = props.defaultBin;
        type = Attributes.types.Binary;
        break;
        case 3:
        defaultValue = 0;
        type = Attributes.types.Set;
        break;
      }
      props.type = type;
      props.default = defaultValue;
      props.set = props.listItems;
      console.log("props name", props);
      let attr = Attributes.defineAttribute(props);
      Core.dispatchEvent("attribute-created", attr);
      Core.exec("close-modal");
    });

    Core.addCommand("select-attribute", (index)=>{
      Attributes.selectedAttribute = index;
      Core.dispatchEvent("attribute-selected", index);
    });


}
