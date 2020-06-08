import Core from './Core';

export default new function DataModel()
{
  let blankStory = {
    time : {
      startYear : 1000,
      lengthInYears : 2000,
      calendar : [
        { name : "January", days : 31 },
        { name : "February", days : 31 },
        { name : "March", days : 31 },
        { name : "April", days : 31 },
        { name : "May", days : 31 },
        { name : "June", days : 31 },
        { name : "July", days : 31 },
        { name : "August", days : 31 },
        { name : "September", days : 31 },
        { name : "October", days : 31 },
        { name : "November", days : 31 },
        { name : "December", days : 31 }
      ],
      hoursInDay : 24,
      minutesInHour : 60,
      secondsInMinute : 60
    },

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
        attributes : [],
        border : [],
        tags  : [],
        notes : []
      },{
        name  : "Rohan",
        desc  : "",
        guid  : Core.getUID(),
        attributes : [],
        border : [],
        tags  : [],
        notes : []
      },{
        name  : "That other one",
        desc  : "",
        guid  : Core.getUID(),
        attributes : [],
        border : [],
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
      border : [
        [2100, 2200], [2200, 2300], [2100, 2400], 
      ],
      attributes : [],
      radius : 50,
      shapeType : "polygon",
      color : '#00ff99'
    },{
      name  : "Sobbo Earth",
      desc  : "",
      guid  : Core.getUID(),
      tags  : [],
      notes : [],
      border : [
      ],
      position : [2800, 2800],
      attributes : [],
      radius : 60,
      shapeType : "circle",
      color : '#ff9900'
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

  this.story = {};

  let currentYear, currentMonth, currentDay, currentHour, currentMinute, currentSecond;

  this.calculateTotalStorySeconds = () =>
  {
    let time = this.story.time;
    console.log("TIMMO", time);


    //We need to know how many days are in a year...

    let c = time.calendar;
    let l = c.length;
    let dayTally = 0;
    for(let i = 0; i < l; ++i)
      dayTally += c[i].days;

    //...then multiply this by how many seconds are in a day...

    let seconds = (time.secondsInMinute * time.minutesInHour * time.hoursInDay) * dayTally;

    //...then multiply this by how many years are in the story

    seconds = Math.round(seconds * time.lengthInYears);

    console.log("TOTAL SECONDS IN STORY", seconds);

  }

  this.createNewStory = () =>
  {
    //Clone the base data
    this.story = JSON.parse(JSON.stringify(blankStory));
    this.calculateTotalStorySeconds();
  }

  this.createNewStory();

  Core.respond("get-story", ()=>{
    return this.story;
  });


    const AttributeTypes = {
      FloatRange : 0,
      IntegerRange : 1,
      Set : 2,
      Binary : 3
    };

    this.attrTypes = AttributeTypes;

    let attributes = [];
    let attrMap = {};

    this.attrList = attributes;

    this.selectedAttribute = -1;

    this.defineAttribute = (props) =>
    {
      let name = props.name;
      let type = props.type || AttributeTypes.Binary;
      let attr = {
        type : type || AttributeTypes.Binary,
        instances : [],
        name : name,
        uid: Core.getUID()
      };
      switch(type)
      {
        case AttributeTypes.FloatRange:
          attr.limited = !!props.limited;
          attr.defaultValue = +(props.default || 0);
          attr.min = +(props.min || 0);
          attr.max = +(props.max || 0);
        break;
        case AttributeTypes.IntegerRange:
          attr.limited = !!props.limited;
          attr.defaultValue = Math.round(+props.default || 0);
          attr.min = Math.round(+props.min || 0);
          attr.max = Math.round(+props.max || 0);
        break;
        case AttributeTypes.Set:
          attr.defaultValue = props.default || 0;
          attr.set = props.set || [];
        break;
        case AttributeTypes.Binary:
          attr.defaultValue = !!props.default;
        break;
      }

      // attr.instantiate = instantiate;

      attr.references = [];


      attributes.push(attr);
      attrMap[name] = attr;

      return attr;

    }


    this.defineAttribute({
      name : "Demo Binary",
      type : AttributeTypes.Binary,
      min : -10,
      max : 10,
      default : 3,
      limited : true
    });


    this.defineAttribute({
      name : "Demo Set",
      type : AttributeTypes.Set,
      default : 1,
      set : [
        "Chinse", "Panse", "Fense"
      ]
    });

    this.defineAttribute({
      name : "Demo Float",
      type : AttributeTypes.FloatRange,
      default : 1,
      min : 0,
      max : 10,
      limited : true
    });








  window.dump = ()=>
  {
    console.log(this.story);
  }


}
