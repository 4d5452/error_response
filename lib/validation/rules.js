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
      if(expected) { return (expected && subject); }
      return -1;
    }
  },
  'type': {
    'err': (identifier) => 
      `Type mis-match for ${identifier}`,
    'validate': (expected, subject) => {
      return typeof(subject) === expected 
    }
  }
}
