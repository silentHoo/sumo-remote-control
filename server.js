// drone
var sumo = require('node-sumo');
var drone = sumo.createClient();
drone.connect();

// webserver -> http://localhost:8888
var http = require('http');
var url = require('url');
var fs = require("fs");

/**
 * To start this server, you just need to do:
 *
 *  - npm install
 *  - node server.js
 *
 * All available drone commands are here: https://github.com/forgeByAcision/node-sumo#api
 */
http.createServer(function (request, response) {
   var requestUrl = url.parse(request.url);
   console.log("Request path: " + requestUrl.path);

   switch (requestUrl.path) {
     case '/forward':
       goForward();
       response.writeHead(200);
       break;
     case '/backward':
       goBackward();
       response.writeHead(200);
       break;
     default:
       sendRemoteControl(response);
       break;
   }
}).listen(8888);

var sendRemoteControl = function(response) {
  fs.readFile('./index.html', (err, data) => {
    if (err) throw err;
    response.writeHead(200);
    response.end(data, 'utf-8');
  });
};

var goForward = function() {
  drone.postureJumper();
  drone.forward(50);

  setTimeout(function() {
    drone.stop();
  }, 1000);
};

var goBackward = function() {
  drone.postureJumper();
  drone.backward(50);

  setTimeout(function() {
    drone.stop();
  }, 1000);
};