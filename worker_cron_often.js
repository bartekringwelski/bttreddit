/* jshint esversion: 6 */

var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var request = require('request');

exports.downloader = function(){
  console.log("downloader to the rescue");
  var date = new Date();
  var redditDownloadDate = `${1+ date.getMonth()}-${date.getDate()}-${-1+ date.getFullYear()}`;
  console.log(redditDownloadDate);

  //download new version of reddit every x minutes....
  request.get('http://reddit.com')
    .on('error', function(err){
      console.log(err);
    }).pipe(fs.createWriteStream(`/Users/bartekringwelski/Desktop/MKS/1mvp/web/archives/sites/reddit.html`))
      .on('finish', function(){
      console.log("saved!");
    });
};

//run downloader for cron job
exports.downloader();
