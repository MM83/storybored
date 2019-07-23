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

  Core.respond("get-story", ()=>{
    return this.story;
  });



}
