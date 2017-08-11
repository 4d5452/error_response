/*  propertyValidation
 *
 *  propertyIdentifier: {
 *    'errorMessage': (dataTypeIdentifier, propertyTestArgument),
 *    'validate: (dataTypeObject, propertyTestArgument)
 *  }
 */

module.exports = {
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
