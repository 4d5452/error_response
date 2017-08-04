const types = require(__base + 'lib/content_types/types.js');

const TYPE_MAP = {
  'business': 'x.business+json',
  'address': 'x.address+json',
  'email': 'x.email+json'
}

const CONTENT = {
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
          'contentType': TYPE_MAP['address']
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


module.exports =  {
  content: CONTENT,
  types: TYPE_MAP
}

/**************************************************************/
