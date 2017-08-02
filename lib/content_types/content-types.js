const types = require('./types.js');

const PRIMITIVES = types.primitives;
const NON_PRIMITIVES = types.nonPrimitives;
const CONTENT_TYPES = types.contentTypes;

module.exports =  {
  primitives: PRIMITIVES,
  nonPrimitives: NON_PRIMITIVES,
  get: (type) => parse(type, CONTENT_TYPES[type])
}

/******************************FUNCTIONS*************************/

function parse(id, content) {
  if(!content.type) {
    return new Error(`'type' is not defined on ${id}`);
  }
  /*id := (type || pro1 || pro2) where pro1 and pro2 represent 
   * nested property ids*/
  /*content := { type: '', properties: { pro1: '', pro2: '', ... }*/

  if(PRIMITIVES[content.type]) {// primitive type found
    if(!content.properties) {
      throw new Error(`'properties' is not defined on leaf of ${id}`);
    }
    /*leaf of the tree: 'content' contains one-or-more PRIMITIVE keys
     * and property values.*/
    let map = new Map();
    /*loop through properties of the PRIMITIVE definition and store in
     * map for return*/
    for(let property in content.properties) {
      map.set(property, content.properties[property]);
    }
    /*'type' should be a restricted rule...  Lets everyone know they made it
     * to the end of the tree*/
    map.set('type', content.type);
    return map;
  }
  if(content.type === NON_PRIMITIVES['reference']) {// reference type found
    if(!content.properties) {
      throw new Error(`'properties' is not defined on ${id}`);
    }
    if(!content.properties.contentType) {
      throw new Error(`'contentType' is not defined on ${id}`);
    }
    if(!CONTENT_TYPES[content.properties.contentType]) {
      throw new Error(`'content-type': 
          ${content.properties.contentType} is not valid`);
    }
    /*'content' is a reference to another object within the CONTENT_TYPES object.
     *  'content' has a property 'contentType' which indicates the new 
     *  type to insert. */
    return parse(content.properties.contentType, 
        CONTENT_TYPES[content.properties.contentType]);
  }
  if(content.type === NON_PRIMITIVES['object']) {// object found
    if(!content.properties) {
      throw new Error(`"properties" is not defined on node ${id}`);
    }
    /*defines a node object within the tree structure.  Recurse through 
     * the remainder of the tree and store the results for return*/ 
    let map = new Map();

    for(let property in content.properties) {
      /*recursive call*/
      let properties = parse(property, content.properties[property]);

      map.set(property, properties);
    }
    return map;
  }
  
  throw new Error(`Non-supported type: ${content.type}`);
}

/********************************************************/

/*
 *  returns := A new Map which is a flattend conversion of the CONTENT_TYPES
 *    JSON object.  By flattend, I mean the referenced properties have been 
 *    replaced by the referenced object.  
 *
 *    From the first object to the last, a new Map is created each time an object
 *    is encountered.  Each object has a set of properties.  The properties of
 *    an object may be: 'objects', 'references', or one of the PRIMITIVE types.
 *    Each of these contain a 'type' and 'properties' key.
 *
 *    'reference' NON_PRIMITIVES contain a property 'contentType' which is a 
 *    reference to another CONTENT_TYPE.  The referenced CONTENT_TYPE must exist
 *    and will replace the 'type' and 'properties' of the current contentType.
 *
 *    PRIMITIVE types mark the base case of the recursive function.  When a
 *    PRIMITIVE type is encountered, a new Map is created and returned.  This
 *    map contains unique information for the current type.
 *
 *    Each time a recursive call is made, the id of the new content type is found
 *    and passed during the next call.  These 'ids' are used to build the maps
 *    returned during each call.  At the PRIMITIVE level they represent keys
 *    such as: 'maxLength', 'minLength', etc...  At the 'object' level 'ids' 
 *    represent one of the following: 'objects', 'references', or one of the 
 *    'PRIMITIVE' types.
 *
 */
