var express = require('express');

var app = express();
var path = require('path');
var partials = require('express-partials');



app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(request, response){

  response.render('pages/index');
});


app.get('/', function(req, res) {
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];

    res.render('pages/index', {
        drinks: drinks,
        tagline: tagline
    });
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
