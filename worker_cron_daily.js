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


  //download new daily snapshot of reddit
  request.get('http://reddit.com')
    .on('error', function(err){
      console.log(err);
    }).pipe(fs.createWriteStream(`/Users/bartekringwelski/Desktop/MKS/1mvp/web/archives/sites/${redditDownloadDate}.html`))
      .on('finish', function(){
      console.log(`saved reddit page from ${redditDownloadDate}`);
    });
};

//run downloader for cron job
exports.downloader();

//CRON JOB CODE
// //*/10 * * * * /usr/local/bin/node /Users/bartekringwelski/Desktop/MKS/1mvp/worker_cron_often.js
// 0 10 * * * /usr/local/bin/node /Users/bartekringwelski/Desktop/MKs/1mvp/worker_cron_daily.js
