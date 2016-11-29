/* jshint esversion: 6 */

var express = require('express');
var app = express();
var path = require('path');
var partials = require('express-partials');
var fs = require('fs');
var request = require('request');
var worker = require('./worker_cron_often');

app.use(express.static('public'));
app.set('view engine', 'ejs');



//LIVE version (up to 10 minutes old)


app.get(`/`, function(request, response) {
  var url = "../../web/archives/sites/reddit.html";
  response.render('pages/index', {url: url, formattedDate:"Live View"});
});



app.get('/refresh', function(req, res) {

  var url = `../../web/archives/sites/reddit.html`;
  //worker.downloader();

//HOW DO I REMOVE THIS DUPLICATE FUNCATIONALITY AND RELY ONLY ON THE NEW PAGE??
  request.get('http://reddit.com')
    .on('error', function(err){
      console.log(err);
    }).pipe(fs.createWriteStream(`/Users/bartekringwelski/Desktop/MKS/1mvp/web/archives/sites/reddit.html`))
      .on('finish', function(){
      res.render('pages/index', {url: url, formattedDate:"Live View"});
    });
  });



/////////////////////////daily downloads....

//11-28-16
app.get(`/11-28-2016`, function(request, response) {
  var url = "../../web/archives/sites/11-28-2016.html";
  response.render('pages/index', {url: url, formattedDate: '11-28-2016'});
});

//11-27-16
app.get(`/11-27-2016`, function(request, response) {
  var url = "../../web/archives/sites/11-27-2016.html";
  response.render('pages/index', {url: url, formattedDate:'11-27-2016'});
});

//11-26-16
app.get(`/11-26-2016`, function(request, response) {
  var url = "../../web/archives/sites/11-26-2016.html";
  response.render('pages/index', {url: url, formattedDate:'11-26-2016'});
});


port = process.env.PORT || 5001; //

app.listen(port, function(){
  console.log(`Listening on port ${port}`);
});
