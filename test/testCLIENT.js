const http = require('http');

const validData = JSON.stringify({
  "string":"normal",
  "email":"jack@jungle.com",
  "message":"HI",
  "business":{
    "name":"JUICE, LLC",
    "address":{
      "street":"Someplace USA",
      "state":"VA"
    },
    "position": "SALES"
  },
  "number": 7,
  "boolean": false,
  "garbage":"key value pair"
});
const invalidData = JSON.stringify({
  "garbage": "Key value pair"
});

const common = {
  'host': '127.0.0.1',
  'port': 2048,
  'timeout': 250,
  'agent': false
}
const testOptions = [
  {
    'path': '/',
    'method': 'GET',
    'message': 'Server PING'
  },{
    'path': '/test',
    'method': 'OPTIONS',
    'message': 'Request OPTIONS from server'
  },{
    'path': '/test',
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Content-Length': `${validData.length}`
    },
    'data': validData,
    'message': 'Sending valid POST request'
  },{
    'path': '/test',
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Content-Length': `${invalidData.length}`
    },
    'data': invalidData,
    'message': 'Sending invalid POST request'
  }
]
test();

/************************************************************/
function test() {
  let options;
  let req;

  for(let option of testOptions) {
    options = Object.assign({}, common, option);
    req = http.request(options, handleResponse);
    req.on('error', handleError);
    if(options.method === 'POST') {
      req.end(options.data);
    } else {
      req.end();
    }
  }
}

function handleResponse(res) {
  console.log(`STATUS: ${res.statusCode}`);
  JSON.parse(JSON.stringify(res.headers), (key, value) => {
    if(value instanceof Object) { return; }
    console.log(key, value);
  });
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`\n${chunk}`);
  });
  res.on('end', () => {
    console.log('\n--------------------------------\n');
  });
}

function handleError(err) {
  console.log(error(`problem with request: ${err.message}`));
}
