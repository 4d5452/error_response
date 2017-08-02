
let expression = '\\W';
let negate = true;
let flag = '';

let test1 = 'abcde';
let test2 = '*abcde';

let test = new RegExp(expression, flag).test(test1);
console.log(test);

test = new RegExp(expression, flag).test(test2);
console.log(test);

console.log(negate ? !test :test);
