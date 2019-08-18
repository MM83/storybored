import Core from './Core';
export default new function Attributes()
{

  const Types = {
    FloatRange : Symbol("Decimal"),
    IntegerRange : Symbol("Integer"),
    Set : Symbol("Set"),
    Binary : Symbol("Binary")
  };

  this.types = Types;

  let attributes = [];
  let attrMap = {};

  this.list = attributes;

  this.selectedAttribute = -1;


  function instantiate(owner)
  {
    // console.log("INSTANTIATE", this);
    let instance = {};

    Object.defineProperty(instance, "type", {
      get : ()=>{
        return this.type;
      }
    });

    Object.defineProperty(instance, "owner", {
      get : ()=>{
        return owner;
      }
    });

    Object.defineProperty(instance, "name", {
      get : ()=>{
        return this.name;
      }
    });

    let value = instance.default;

    switch (this.type) {


      case Types.FloatRange:

        Object.defineProperty(instance, "value", {
          get : () => {
            return value;
          },
          set : (newValue) => {
            if(!this.limited){
              value = newValue;
            } else {
              value = Math.max(Math.min(newValue, this.max), this.min);
            }
            console.log("new value", value);
          },
        });
      break;


      case Types.IntegerRange:
        Object.defineProperty(instance, "value", {
          get : () => {
            return value;
          },
          set : (newValue) => {
            if(!this.limited)
              value = newValue;
            else
              value = Math.round(Math.max(Math.min(newValue, this.max), this.min));
            console.log("new value", value);
          },
        });
      break;


      case Types.Set:
        Object.defineProperty(instance, "value", {
          get : () => {
            return this.set[value];
          },
          set : (newValue) => {
            if(!((newValue < 0) || (newValue > (this.set.length - 1))))
              value = newValue;
              console.log("new value", this.set[value]);
          },
        });
      break;


      case Types.Binary:
        Object.defineProperty(instance, "value", {
          get : () => {
            return value
          },
          set : (newValue) => {
            value = !!newValue;
            console.log("new value", value);
          },
        });
      break;
    }

    instance.baseType = this;

    this.instances.push(instance);

    return instance;

  }

  this.defineAttribute = (props)=>
  {
    let name = props.name;
    let type = props.type || Types.Binary;
    let attr = {
      type : type || Types.Binary,
      instances : [],
      name : name,
      uid: Core.getUID()
    };
    switch(type)
    {
      case Types.FloatRange:
        attr.limited = !!props.limited;
        attr.defaultValue = +(props.default || 0);
        attr.min = +(props.min || 0);
        attr.max = +(props.max || 0);
      break;
      case Types.IntegerRange:
        attr.limited = !!props.limited;
        attr.defaultValue = Math.round(+props.default || 0);
        attr.min = Math.round(+props.min || 0);
        attr.max = Math.round(+props.max || 0);
      break;
      case Types.Set:
        attr.limited = !!props.limited;
        attr.defaultValue = props.default || 0;
        attr.set = props.set || [];
      break;
      case Types.Binary:
        attr.defaultValue = !!props.default;
      break;
    }

    attr.instantiate = instantiate;

    attributes.push(attr);
    attrMap[name] = attr;
    return attr;

  }

  this.deleteInstance = (instance) =>
  {
    let instances = instance.baseType.instances;
    let index = instances.indexOf(instance);
    instances.splice(index, 1);
    Core.dispatchEvent("attribute-instance-deleted");
  }

  //
  // let attr = this.defineAttribute({
  //   name : "SHEMMO",
  //   type : Types.FloatRange,
  //   limited : true,
  //   min : -20,
  //   max : 20
  // });
  //
  // let floatExample = attr.instantiate(true);
  //
  // this.deleteInstance(floatExample);


}
