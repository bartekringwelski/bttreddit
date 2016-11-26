var express = require('express');

var app = express();

app.use(express.static('public'))



app.get('/', function(request, response){
  response.send("inside server");
  console.log("hey from console isnide get");
});

app.post('/', function(request, response){
  response.send("yo from inside post");
  console.log("hey from inside post response");
});


var ip = '127.0.0.1';
var port = 8080;


app.listen(port, ip, function(){
  console.log(
  `Listening on:
   port: ${port},
   ip:   ${ip}`
  );
});
