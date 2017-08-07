const PRIMITIVES = {
  'number': 'number',
  'string': 'string',
  'boolean': 'boolean'
}

const NON_PRIMITIVES = {
  'object': 'object',
  'reference': 'reference'
}

module.exports =  {
  getPrimitive: getPrimitive,
  isPrimitive: isPrimitive,
  getNonPrimitive: getNonPrimitive,
  isNonPrimitive: isNonPrimitive
}

/***********************************************************/

function getPrimitive(type) {
  if(!PRIMITIVES[type]) {
    throw new Error(`Unsupported primitive type ${type}`);
  }
  return PRIMITIVES[type];
}

function isPrimitive(type) {
  return PRIMITIVES[type] ? true : false;
}

function getNonPrimitive(type) {
  if(!NON_PRIMITIVES[type]) {
    throw new Error(`Unsupported non-primitive type ${type}`);
  }
  return NON_PRIMITIVES[type];
}

function isNonPrimitive(type) {
  return NON_PRIMITIVES[type] ? true : false;
}

function getType(type, typeMap) {
  if(!typeMap[type]) {
    throw new Error(`Unsupported content type ${type}`);
  }
  return typeMap[type];
}
