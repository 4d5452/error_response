const RULES = require('./rules');

module.exports = validate;

/**********************Functions******************************/
function validate(id, object, subject) {

  let leaf = object['type'] ? true : false;

  if(leaf) {
    let results = [];
    let required = object['required'];
    /*test for requirment*/
    if(required === undefined){// AUDIT: remove to pre-test: must be present and boolean
      throw new Error(`'required' not found on ${id}`);
    }
    if(required && (subject === undefined)) {
      /*required and not found*/
      results.push(RULES['required'].err(id));
    } else if(!required && (subject === undefined)) {
      /*not required and not found*/
      return null;
    } else {
      /*not required and found || required and found*/
      /*test remaining values*/
      for(let key in object) {
        if(key === 'required') { continue; } //hate checking for this everytime: need deep copy
        if(!RULES[key]) {// AUDIT: remove to pre-test: must be valid rule definition
          throw new Error(`Unsupported rule ${key} in ${id}`);
        }
        let result = RULES[key].validate(object[key], subject);
        if(result !== true) {
          results.push(RULES[key].err(id, object[key]));
        }
      }
    }
    return results.length > 0 ? results : null;
  } else {
    let ret = {};
    for(let key in object) {
      /*because the subject may not contain a complete structure that mimics
       * the pre-defined map structure, replace any missing subject values
       * with undefined so we may continue to build the response*/
      let tmp = subject ? subject[key] : undefined;
      let result = validate(key, object[key], tmp);
      if(result) {
        /*If validate returns something, an error occurred.*/
        ret[key] = result;
      }
    }

    return Object.keys(ret).length > 0 ? ret : null;
  }
}

// returns a new object that contains error messages (if any) for each
//  key within the passed object.  Below is the format of the returned object:
//  rtnObject = {
//    key1: ['key1_errMsgMaxLength', 'key2_errMsgMinLength', etc...],
//    key2: ['key2_errMsgRequired'],
//    key3: [],
//    key4: { 
//      'sub_key1_errMsg...'
//      sub_key2: {
//        'sub_key1_errMsg...'
//      }
//    }
//    etc...
//  }
//
//  or "null" if no error found

