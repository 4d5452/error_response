const Definition = require(__base + 'lib/common/Definition.js');
const types  = require(__base + 'lib/common/supported-types.js');
const common = require(__base + 'lib/common/common-definitions.js');

let ret = new Definition();

const root = 'test';

const typeMap = {
  'test': 'x.localhost.test-v1+json',
  'business': 'x.business+json'
}

const content = {
  'x.localhost.test-v1+json': {
    'type': types.getNonPrimitive('object'),
    'properties': {
      'string': {
        'type': types.getPrimitive('string'),
        'properties': {
          'maxLength': 10,
          'minLength': 5,
          'regex': {
            'negate': true,
            'expression': '[^A-Za-z0-9_]',
            'flag': 'g' 
          },
          'required': true
        }
      },// end: name
      'email': {
        'type': types.getNonPrimitive('reference'),
        'properties': {
          'contentType': common.getType('email')
        }
      },// end: email
      'business': {
        'type': types.getNonPrimitive('reference'),
        'properties': {
          'contentType': typeMap['business']
        }
      },//end: business
      'number': {
        'type': types.getPrimitive('number'),
        'properties': {
          'maxValue': 10,
          'minValue': 5,
          'required': true
        }
      },
      'boolean': {
        'type': types.getPrimitive('boolean'),
        'properties': {
          'boolean': false,
          'required': true
        }
      }
    }
  },// end: test
  'x.business+json': {
    'type': types.getNonPrimitive('object'),
    'properties': {
      'name': {
        'type': types.getPrimitive('string'),
        'properties': {
          'maxLength': 10,
          'minLength': 5,
          'required': true
        }
      },
      'address': {
        'type': types.getNonPrimitive('reference'),
        'properties': {
          'contentType': common.getType('address')
        }
      },
      'position': {
        'type': types.getPrimitive('string'),
        'properties': {
          'maxLength': 10,
          'minLength': 5,
          'required': false
        }
      }
    }
  }
}

ret.add(typeMap, content);
ret.setRoot(root);

module.exports = ret;

/*************************************************************/
