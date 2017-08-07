module.exports = Definition;

function Definition() {
  this.typeMap = {};
  this.content = {};
  this.root = undefined;
}

Definition.prototype.getType = function(internalType) {
  if(!this.typeMap[internalType]) {
    throw new Error(`Unknown type ${internalType}, rejecting request for content`);
  }
  return this.typeMap[internalType];
}

Definition.prototype.getTypes = function() {
  return this.typeMap;
}

Definition.prototype.getRoot = function() {
  return this.root;
}

Definition.prototype.setRoot = function(id) {
  if(!this.typeMap[id]) {
    throw new Error(`Cannot set root ${id} because it does not exist`);
  }
  this.root = this.typeMap[id];
}

Definition.prototype.add = function(typeMap, content) {
  let internal;
  let external;

  for(let key in typeMap) {
    internal = key;
    external = typeMap[key];

    if(this.typeMap[internal]) {// non-unique internal id
      throw new Error(`Internal type ${internal} has been defined`);
    }
    if(find(external, this.typeMap)) {// non-unique external id
      throw new Error(`External type ${external} has been defined`);
    }
    if(!find(external, content)) {// content does not contain external def
      throw new Error(`Content does not contain an id ${external}`);
    }
    this.typeMap[internal] = external;
    this.content[external] = content[external];
  }
}

Definition.prototype.getContent = function() {
  return this.content;
}


/*************************************************************/
function find(value, object) {
  for(let key in object) {
    if(key === value) {
      return true;
    }
  }
  return false;
}
