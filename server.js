/* jshint esversion: 6 */

//basics and plugins

var express = require('express');
var app = express();
var path = require('path');
var partials = require('express-partials');
var fs = require('fs');
var request = require('request');
var worker = require('./worker_cron_often');

var bodyParser = require('body-parser');
app.use(bodyParser.text({ type: 'text/html' }));


app.use(express.static('public'));

app.use('/modules', express.static('/node_modules'));
app.set('view engine', 'ejs');
port = process.env.PORT || 5001; //

app.listen(port, function(){
  console.log(`Listening on port ${port}`);
});



//used to fetch reddit content from react front-end
app.get('/populate', function(request, response) {

  fs.readFile('/Users/bartekringwelski/Desktop/MKS/1mvp/web/archives/sites/reddit.html', function (err, data) {
    if(err) { console.error(err) };
    console.log('errrr', err);
    var sitesHTMLdata = Buffer.concat([data]).toString();
    console.log(sitesHTMLdata);
    response.send(sitesHTMLdata);
  });

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
var RedditPageSchema = mongoose.Schema({
      pageName: String,
      html: String,
});


// //methods for schema


//intsantiating model


var Page = mongoose.model('Page', RedditPageSchema);


//Kitten.find({name: /^fluff/}, (error,results) => console.log(results));

//Kitten.find({ name: /^fluff/ }, callback);

fs.readFile('/Users/bartekringwelski/Desktop/MKS/1mvp/web/archives/sites/loading.html', function (err, data) {
  if(err) { console.error(err) };
  var completedHTMLfile = Buffer.concat([data]).toString();

  var loading = new Page({pageName: "loading", html: completedHTMLfile });

  loading.save( (err,loading) => {
    if (err) {console.log("uh oh");}
    console.log("saved", loading);
  });
});

  console.log("found the contents?");
  Page.find({pageName: /loading/},(error, object) => {
    if(error) {
      console.log(error, "ohooo");
    } else {
        console.log(object[0].html);
      }
    });


//  var query = Kitten.findOne({'name':'loading'})
//  Page.find({name: /^<div>/}, (error,results) => console.log(results));

//  console.log(query);


//routers

//main route (up to 10 minutes old)

//REACT EXPERIMENT
app.get(`/react`, function(request, response) {
  var url = "../../web/archives/sites/reddit.html";

  //fs read file from reddit.html
  // send response with html database
  // set state as current pages
  //
  // res.send(//)
  response.sendFile(path.join(__dirname + '/index.html'));
});




// app.get(`/`, function(request, response) {
//   var url = "../../web/archives/sites/reddit.html";
//
//   //fs read file from reddit.html
//   // send response with html database
//   // set state as current pages
//   //
//   // res.send(//)
//
//
//
//   response.sendFile(path.join(__dirname + '/index.html'));
// //  response.render('pages/index', {url: url, formattedDate:"Live View"});
// });


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
