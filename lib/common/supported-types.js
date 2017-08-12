const PRIMITIVES = {
  'number': {
    'required': [ 'required', 'type' ],
    'allowed': [ 'maxValue', 'minValue' ]
  },
  'string': {
    'required': [ 'required', 'type' ],
    'allowed': [ 'maxLength', 'minLength', 'regex' ] 
  },
  'boolean': {
    'required': [ 'required', 'boolean', 'type' ],
    'allowed': [ ]
  }
}

const NON_PRIMITIVES = {
  'object': 'object',
  'reference': 'reference'
}

const PRIMITIVE_PROPERTIES = {
  'maxLength': {
    'err': (identifier, expected) => 
      `${identifier} must not exceed a maximum length of ${expected}`,
    'validate': (expected, subject) => subject.length <= expected
  },
  'minLength': {
    'err': (identifier, expected) => 
      `${identifier} must have a minimum length of ${expected}`,
    'validate': (expected, subject) => subject.length >= expected
  },
  'maxValue': {
    'err': (identifier, expected) => 
      `${identifier} must be less than or equal to ${expected}`,
    'validate': (expected, subject) => subject <= expected
  },
  'minValue': {
    'err': (identifier, expected) => 
      `${identifier} must be greater than or equal to ${expected}`,
    'validate': (expected, subject) => subject >= expected
  },
  'boolean': {
    'err': (identifier, expected) =>
      `${identifier} was expected to be ${expected} and was NOT`,
    'validate': (expected, subject) => subject === expected
  },
  'regex': {
    'err': (identifier) => 
      `${identifier} is not valid`,
    'validate': (expected, subject) => {
      let test = new RegExp(expected.expression, expected.flag).test(subject);
      return expected.negate ? !test : test;
    }
  },
  'required': {
    'err': (identifier) => 
      `${identifier} is required`,
    'validate': (expected, subject) => {
      if(expected) { return (expected && (subject === null)); }
      return -1;
    }
  },
  'type': {
    'err': (identifier) => 
      `Type mis-match for ${identifier}`,
    'validate': (expected, subject) => {
      if(expected !== 'number' && expected !== 'string' && expected !== 'boolean') {//AUDIT: remove to pre-test:
        throw new Error(`Unsupported type for validation: ${expected}`);
      }
      return typeof(subject) === expected; 
    }
  }
}

  //getPrimitive: getPrimitive,
  //getNonPrimitive: getNonPrimitive
module.exports =  {
  isPrimitive: isPrimitive,
  isNonPrimitive: isNonPrimitive,
  isReference: isReference,
  isObject: isObject,
  isValid: isValid,
  getPrimitiveProperties: () => PRIMITIVE_PROPERTIES
}

/***********************************************************/
function isValid(type, object) {
  let prim = PRIMITIVES[type]; // calling function should no this value exist before calling
  let required = [...prim.required]; // copy required elements to new array
  let allowed = [...prim.allowed]; // copy allowed elements to new array
  let index; // place holder for index
  for(let property in object) {
    index = required.indexOf(property); // check if the key is required
    if(index !== -1) { // if it was found
      required.splice(index, 1); // remove it from the required array
      continue; // continue to next interation
    }

    index = allowed.indexOf(property); // check if the key is allowed
    if(index !== -1) { // if it is
      allowed.splice(index, 1); // remove it from the allowed array
      continue; // continue to next interation
    }
    
    // if key was not required or allowed throw error; might happen if duplicate occured 
    throw new Error(`Unsupported property ${property} or possible duplicate found in ${type}`);
  }

  if(required.length > 0) { // if not all required keys are found
    // throw error to notify
    throw new Error(`Type ${type} does not have required property definitions: ${required}`);
  }

  return true;
}

function isPrimitive(type) {
  return PRIMITIVES[type] !== undefined ? true : false;
}

function isNonPrimitive(type) {
  return NON_PRIMITIVES[type] !== undefined ? true : false;
}

function isReference(type) {
  return NON_PRIMITIVES[type] === 'reference';
}

function isObject(type) {
  return NON_PRIMITIVES[type] === 'object';
}

function getPrimitive(type) {
  if(!PRIMITIVES[type]) {
    throw new Error(`Unsupported primitive type ${type}`);
  }
  return PRIMITIVES[type];
}

function getNonPrimitive(type) {
  if(!NON_PRIMITIVES[type]) {
    throw new Error(`Unsupported non-primitive type ${type}`);
  }
  return NON_PRIMITIVES[type];
}

function getType(type, typeMap) { //AUDIT: move to external location
  if(!typeMap[type]) {
    throw new Error(`Unsupported content type ${type}`);
  }
  return typeMap[type];
}
