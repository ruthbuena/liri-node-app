vaf fs = require("fs");

var one = process.argv[2];
var two = process.argv[3];

var request = require('request');

// Part One: Node Last 20 Twitter tweets
var keys = require('./keys.js');
var Twitter = require('twitter');
var client = new Twitter({
      consumer_key: keys.twitterKeys.consumer_key,
      consumer_secret: keys.twitterKeys.consumer_secret,
      access_token_key: keys.twitterKeys.access_token_key,
      access_token_secret: keys.twitterKeys.access_token_secret
});

var params = {count: 20};

function myTweets(){
  client.get('statuses/user_timeline', params, function(error, tweets,response){
    if (!error) {
        for (var i=0; i < tweets.length; i++) {
          console.log(tweets[i].text + "Created on: " + tweets[i].created_at);
          fs.appendFile('log.txt', tweets[i].text + "Created on: " + tweets[i].created_at + "\n");
        }
          fs.appendFile('log.txt', "============================================================");
    } else {
          console.log(error);
    }
  });
}

// Part Two: Node Spotify This Song
var spotify = require('spotify');
