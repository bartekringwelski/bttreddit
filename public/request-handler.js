//change sites .txt to only include files where we have HTML

var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var urlsNotYetRetrieved = [];


exports.handleRequest = function (request, response) {


  var responseHeaders = defaultCorsHeaders;
  var method = request.method;
  var header = request.header;
  var url = request.url;
  console.log('request url =', request.url);
  var statusCode;
  var body = [];

  console.log(method);

  fs.readFile('../web/archives/sites.txt', function (err, data) {
    console.log(data);
    var sitesTextData = Buffer.concat([data]).toString();//.slice(4);
    console.log("sites text data:")
    console.log(sitesTextData);

    if(method === 'POST' && url === '/') {
      request.on('error', function(err) {
         console.error(err);
      }).on('data', function(chunk) {
        body.push(chunk);
      }).on('end', function() {
        statusCode = 201;
        //get contents of body
        body = Buffer.concat(body).toString().slice(4);
        console.log('body of new post request:')
        console.log(body);

        if(sitesTextData.indexOf(body) > -1){
          var fileName = body.substring(4, body.length - 4) + '.html';
          fs.readFile(`../web/archives/sites/${fileName}`,function (err, data){
                console.log(data);
                 response.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
                 response.write(data);
                 response.end();
           });
        } else {
          console.log("item not found, url Lookup failed. rendering loading file.");
            // display loading screen

            fs.readFile('public/loading.html',function (err, data){
                  // console.log(data);
                   response.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
                   response.write(data);
                   response.end();
            });

            // if url is newly submitted, then add to to urlsNotYetRetrieved
            console.log(body);
            if(urlsNotYetRetrieved.indexOf(body) === -1){
              urlsNotYetRetrieved.push(body);
            }
            console.log(urlsNotYetRetrieved);
        }
      });
    }else if('OPTIONS') {
      statusCode = 200;
      response.writeHead(statusCode, responseHeaders);
      response.end();
    }else{
      statusCode = 404;
      response.writeHead(statusCode, responseHeaders);
      response.end('You are looking for a page that does not exist');
    }
  });


};

var cronJob = function(){
  urlsNotYetRetrieved.forEach(function(element){
    // calls the archive function
    archive.downloadUrls(`http://${element}`);

// updated the text file
    fs.appendFile('../web/archives/sites.txt', element+"\n", (err) => {
      if (err) throw err;
      console.log('Flushing element into perma storage!');
    });
  });
  urlsNotYetRetrieved = [];
  console.log("cronJob done!");
};


setInterval(cronJob,15000);

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
