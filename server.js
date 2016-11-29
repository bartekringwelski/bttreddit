/* jshint esversion: 6 */

//basics and plugins

var express = require('express');
var app = express();
var path = require('path');
var partials = require('express-partials');
var fs = require('fs');
var request = require('request');
var worker = require('./worker_cron_often');

app.use(express.static('public'));
app.set('view engine', 'ejs');
port = process.env.PORT || 5001; //

app.listen(port, function(){
  console.log(`Listening on port ${port}`);
});

//mongo database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to freaking mongo db");
});

// schema properties
var kittySchema = mongoose.Schema({
    name: String
});

//methods for schema
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

//intsantiating model


var Kitten = mongoose.model('Kitten', kittySchema);

var steveCat = new Kitten({ name: 'steve' });
console.log(steveCat.name); // 'steve'
console.log(steveCat.speak()); // 'steve'


//routers

//main route (up to 10 minutes old)

app.get(`/`, function(request, response) {
  var url = "../../web/archives/sites/reddit.html";
  response.render('pages/index', {url: url, formattedDate:"Live View"});
});


//refresh router

app.get('/refresh', function(req, res) {

  var url = `../../web/archives/sites/reddit.html`;
  //worker.downloader();

  //use promise to refactor
  request.get('http://reddit.com')
    .on('error', function(err){
      console.log(err);
    }).pipe(fs.createWriteStream(`/Users/bartekringwelski/Desktop/MKS/1mvp/web/archives/sites/reddit.html`))
      .on('finish', function(){
      res.render('pages/index', {url: url, formattedDate:"Live View"});
    });
  });



//archive routes

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
