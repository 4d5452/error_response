const PRIMITIVES = {
  'integer': 'integer',
  'string': 'string'
}

const NON_PRIMITIVES = {
  'object': 'object',
  'reference': 'reference'
}

const CONTENT_TYPES = {
  '/contact/message': { //dataTypeID
    'type': 'object',
    'properties': {
      'name': {
        'type': 'string',
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
        'type': 'string',
        'properties': {
          'maxLength': 254,
          'minLength': 3,
          'required': true
        }
      },// end: email
      'business': {
        'type': 'reference',
        'properties': {
          'contentType': '/business'
        }
      },//end: business
      'message': {
        'type': 'string',
        'properties': {
          'maxLength': 180,
          'required': true
        }
      }// end: message
    }// end: properties
  },// end: /contact/message
  '/business': {
    'type': 'object',
    'properties': {
      'name': {
        'type': 'string',
        'properties': {
          'maxLength': 45,
          'minLength': 3,
          'required': true
        }
      },//end: name
      'position': {
        'type': 'string',
        'properties': {
          'maxLength': 45,
          'minLength': 3,
          'required': false
        }
      },
      'address': {
        'type': 'reference',
        'properties': {
          'contentType': '/address'
        }
      }//end: address
    }//end: properties
  },//end: /bussiness
  '/address': {
    'type': 'object',
    'properties': {
      'street': {
        'type': 'string',
        'properties': {
          'maxLength': 45,
          'minLength': 3,
          'required': true
        }
      },
      'state': {
        'type': 'string',
        'properties': {
          'maxLength': 2,
          'minLength': 2,
          'required': true
        }
      }
    }//end: properties
  }//end: /address
}// end: paths

module.exports =  {
  primitives: PRIMITIVES,
  nonPrimitives: NON_PRIMITIVES,
  contentTypes: CONTENT_TYPES
}
