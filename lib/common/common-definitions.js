const Definition = require(__base + 'lib/common/Definition.js');
const types = require(__base + 'lib/common/supported-types.js');

let ret = new Definition();

const typeMap = {
  'business': 'x.business+json',
  'address': 'x.address+json',
  'email': 'x.email+json'
}
const content = {
  'x.business+json': {
    'type': types.getNonPrimitive('object'),
    'properties': {
      'name': {
        'type': types.getPrimitive('string'),
        'properties': {
          'maxLength': 45,
          'minLength': 3,
          'required': true
        }
      },
      'position': {
        'type': types.getPrimitive('string'),
        'properties': {
          'maxLength': 45,
          'minLength': 3,
          'required': false
        }
      },
      'address': {
        'type': types.getNonPrimitive('reference'),
        'properties': {
          'contentType': typeMap['address']
        }
      }
    }
  },//end: business
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
      'required': true
    }
  }//end: email
}// end: CONTENT

ret.add(typeMap, content);

module.exports = ret;

/**************************************************************/
