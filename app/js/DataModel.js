import Core from './Core';
import Attributes from './Attributes';

export default new function DataModel()
{
  let blankStory = {
    notes : [],
    tags : [
      {
        name : "Sample Tag 1",
        color : "#ff9900",
        description : "This is a tag. You can use this to assign simple, common attributes",
        guid : "AAAA",
        searchModifiers : {
          notes : true
        }
      },{
        name : "Sample Tag 2",
        color : "#ff9900",
        description : "This is a tag. You can use this to assign simple, common attributes",
        guid : "AAdAA",
        searchModifiers : {
          notes : true
        }
      },{
        name : "Sample Tag 3",
        color : "#ff9900",
        description : "This is a tag. You can use this to assign simple, common attributes",
        guid : "AA42AA",
        searchModifiers : {
          notes : false
        }
      },
    ],

    characters : [],
    selectedCharacter : -1,

    items : [],
    selectedItem : -1,

    locations : [
      {
        name  : "Minas Tirith",
        desc  : "",
        guid  : Core.getUID(),
        tags  : [],
        notes : []
      },{
        name  : "Rohan",
        desc  : "",
        guid  : Core.getUID(),
        tags  : [],
        notes : []
      },{
        name  : "That other one",
        desc  : "",
        guid  : Core.getUID(),
        tags  : [],
        notes : []
      }
    ],
    selectedLocation : 0,

    events : [],
    selectedEvent : -1,

    regions : [{
      name  : "Middle Earth",
      desc  : "",
      guid  : Core.getUID(),
      tags  : [],
      notes : [],
      position : [20, 50],
      radius : 100,
      shapeType : "circle",
      color : "#0099ff"
    },{
      name  : "Sobbo Earth",
      desc  : "",
      guid  : Core.getUID(),
      tags  : [],
      notes : [],
      position : [120, 50],
      radius : 30,
      shapeType : "circle",
      color : "#ff9900"
    }],
    selectedRegion : -1,

    world : {
      dimensions : [2048, 2048]
    },

    searchModifiers : {
      notes : {
        catsOpen : false,
        tagsOpen : false,
        byTag : false,
        categories : {
          Story : true,
          Characters : true,
          Items : true,
          Locations : true,
          Events : true,
          Regions : true,
          World : true
        }
      }
    }


  };

  this.attributes = Attributes;

  this.story = {};

  this.createNewStory = () =>
  {
    //Clone the base data
    this.story = JSON.parse(JSON.stringify(blankStory));
  }

  this.createNewStory();

  Core.respond("get-story", ()=>{
    return this.story;
  });

  Core.respond("get-attributes", ()=>{
    return Attributes;
  });


}
