const types  = require(__base + 'lib/content_types/types.js');
const common = require(__base + 'lib/content_types/common.js');

const TYPE_MAP = {
  'contact-message': 'vnd.ashetec.contact-message-v1+json'
}

const CONTACT_MESSAGE = {
  'vnd.ashetec.contact-message-v1+json': { //dataTypeID
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
  }// end: contact-message
}// end: CONTACT_MESSAGE

module.exports = {
  getTypes: TYPE_MAP,
  getContent: CONTACT_MESSAGE
}

/*************************************************************/
