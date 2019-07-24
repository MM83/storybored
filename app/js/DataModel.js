import Core from './Core';

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
      }
    ],
    characters : [],
    selectedCharacter : -1,


    searchModifiers : {
      notes : {
        catsOpen : true,
        tagsOpen : false,
        byTag : false,
        categories : {
          Story : true,
          Characters : true,
          Items : true,
          Locations : true,
          Events : true,
          Attributes : true,
          Regions : true,
          World : true
        }
      }
    }


  };

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



}
