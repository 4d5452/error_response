const Content = require(__base + 'lib/common/Content.js');
const types = require('./types.js');

/*
 *  Returns a function which accepts a type (string) and a Content object that
 *    represents the non-reduced endpoint definition of all endpoints within the application.
 *    Type must be availiable as an entry into the Content object.  i.e. Content.has(type) must 
 *    evaluate to true.
 */
module.exports = getReduced 

/******************************FUNCTIONS*************************/
function getReduced(type, appContent) {
  // enforce type for appContent
  if(!appContent instanceof Content) {
    throw new Error('arg (2) must be an instance of Content');
  } 
  /*Recursive function that will parse a content-type to return its reduced form*/
  let parse = (id, content) => {
    // each component within content must define a type key
    if(!content.type) {
      return new Error(`'type' is not defined on ${id}`);
    }
    // each component within content must define a properties key
    if(!content.properties) {
      throw new Error(`'properties' is not defined on leaf of ${id}`);
    }
    
    // is type definied as primitive: if so treat as leaf
    if(types.isPrimitive(content.type)) {// primitive type found: base case
      /*leaf of the tree: 'content' contains one-or-more PRIMITIVE keys
       * and property values.*/
      let ret = {};
      /*loop through properties of the PRIMITIVE definition and store in
       * map for return*/
      for(let property in content.properties) {
        ret[property] = content.properties[property];
      }
      /*'type' will now be inserted into the leaf node.  Lets everyone know they made it
       * to the end of the tree while parsing*/
      ret['type'] = content.type;
      return ret;
    }
    // is type defined as a reference:
    if(content.type === types.getNonPrimitive('reference')) {// reference type found
      let reference = content.properties.contentType;
    
      // does the content object contain a contentType defintion within properties?
      if(reference === null) {
        // if not throw an error as this is required.
        throw new Error(
            `'contentType' is not defined on reference item ${id}`);
      }
      // does the reference exist as a definition within the app?
      if(!appContent.has(reference)) {
        // fail here to let the developer know they mispelled or did not include the definition
        throw new Error(`contentType ${reference} not defined in global content`);
      }
      /*'content' is a reference to another object within the CONTENT_TYPES object.
       *  'content' has a property 'contentType' which indicates the new 
       *  type to insert.*/
      // parse(id, content)
      return parse(content.properties.contentType, 
          appContent.get(reference));
    }
    // is type defined as an object
    if(content.type === types.getNonPrimitive('object')) {// object found
      /*defines a composite object within the tree structure.  Recurse through 
       * the remainder of the tree and store the results for return*/ 
      let ret = {}
      
      // properties represent the new ids for each recursive call.  Within the app they 
      //  represent content-type specific features such as 'name' or 'business'
      for(let property in content.properties) {
        // parse(id, content)
        let properties = parse(property, content.properties[property]);
        // parse returns an object.  Add this object to the return object.
        ret[property] = properties;
      }
      return ret;
    }
    
    // fail fast as this is means type is not supported
    throw new Error(`Non-supported type: ${content.type}`);
  }// end: parse
  
  // make the initial call to parse and return its content to caller.
  // parse(id, content)
  return parse(type, appContent.get(type));
}
