const Definition = require(__base + 'lib/common/Definition.js');
const types  = require(__base + 'lib/common/supported-types.js');
const common = require(__base + 'lib/common/common-definitions.js');

let ret = new Definition();

const root = 'contact-message';

const typeMap = {
  'contact-message': 'vnd.ashetec.contact-message-v1+json'
}

const content = {
  'vnd.ashetec.contact-message-v1+json': {
    'type': types.getNonPrimitive('object'),
    'properties': {
      'name': {
        'type': types.getPrimitive('string'),
        'properties': {
          'maxLength': 24,
          'minLength': 2,
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
          'contentType': common.getType('business')
        }
      },//end: business
      'message': {
        'type': types.getPrimitive('string'),
        'properties': {
          'maxLength': 180,
          'required': true
        }
      }
    }
  }// end: content
}

ret.add(typeMap, content);
ret.setRoot(root);

module.exports = ret;

/*************************************************************/
