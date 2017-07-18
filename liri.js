vaf fs = require("fs");

var one = process.argv[2];
var two = process.argv[3];

var request = require('request');

// Part One: Node Last 20 Twitter tweets
var keys = require('./keys.js');
var Tweet = require('twitter');
var myTweets = new Tweet({
      consumer_key: keys.twitterKeys.consumer_key,
      consumer_secret: keys.twitterKeys.consumer_secret,
      access_token_key: keys.twitterKeys.access_token_key,
      access_token_secret: keys.twitterKeys.access_token_secret
});

var lastTwenty = {count: 20};
