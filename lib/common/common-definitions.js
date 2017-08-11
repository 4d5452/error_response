const Definition = require(__base + 'lib/common/Definition.js');
const types = require(__base + 'lib/common/supported-types.js');

let ret = new Definition();

const typeMap = {
  'address': 'x.address+json',
  'email': 'x.email+json'
}
const content = {
  'x.address+json': {
    'type': types.getNonPrimitive('object'),
    'properties': {
      'street': {
        'type': types.getPrimitive('string'),
        'properties': {
          'maxLength': 45,
          'minLength': 3,
          'required': true
        }
      },
      'state': {
        'type': types.getPrimitive('string'),
        'properties': {
          'maxLength': 2,
          'minLength': 2,
          'required': true
        }
      }
    }
  },//end: address
  'x.email+json': {
    'type': types.getPrimitive('string'),
    'properties': {
      'maxLength': 254,
      'minLength': 3,
      'regex': {
        'negate': false,
        'expression': '^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$',
        'flag': 'g'
      },
      'required': true
    }
  }//end: email
}// end: CONTENT

ret.add(typeMap, content);

module.exports = ret;

/**************************************************************/
