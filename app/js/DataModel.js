import Core from './Core';

export default new function DataModel()
{
  let blankStory = {
    tags : [
      {
        name : "Sample Tag",
        color : "#ff9900",
        description : "This is a tag. You can use this to assign simple, common attributes",
        guid : "AAAA",
        notes : []
      }
    ]
  };

  this.story = {};

  this.createNewStory = ()=>
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



}
