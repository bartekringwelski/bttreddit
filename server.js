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


port = process.env.PORT || 5000; //

app.listen(port, function(){
  console.log(`Listening on port ${port}`);
});
