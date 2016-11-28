var express = require('express');

var app = express();
var path = require('path');
var partials = require('express-partials');

app.use(express.static('public'));
app.set('view engine', 'ejs');




app.get('/11-26-2016', function(request, response) {
   var url = "../../web/archives/sites/11-26-2016.html";

    response.render('pages/index', {url: url});
});


app.get('/', function(request, response) {
   var url = "../../web/archives/sites/11-27-2016.html";

    response.render('pages/index', {url: url});
});



app.post('/', function(request, response){
  response.send("yo from inside post");
  console.log("hey from inside post response");
});


port = process.env.PORT || 5000; //

app.listen(port, function(){
  console.log(`Listening on port ${port}`);
});




// Code goes here

//
// var Componentnt=React.createClass({
//
//   render:function()
//   {
//     var Iframe=this.props.iframe;
//
//     return(
//
//       <div>
//
//        <Iframe src={this.props.src} height={this.props.height} width={this.props.width}/>
//
//       </div>
//       )
//   }
// });
// ReactDOM.render(
//   <Componentnt iframe='iframe' src="../web/archives/sites/reddit.html" height="500" width="1000"/>,
//   document.getElementById('app')
