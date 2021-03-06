var fs = require("fs");

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

var params = {
  count: 20
};

function myTweets() {
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text + "Created on: " + tweets[i].created_at);
        fs.appendFile('log.txt', tweets[i].text + "Created on: " + tweets[i].created_at + "\n");
      }
      fs.appendFile('log.txt', "============================================================\n");
    } else {
      console.log(error);
    }
  });
}

// Part Two: Node Spotify This Song
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: '5279c91d9a4f456ba81ff30a6b81d175',
  secret: 'a95b22e42f6a428c90fec7394039bada'
});

function spotifyThis() {
  // var queryInput = "The Sign Ace of Base";
  // if (two !== undefined) {
  //   queryInput = two;
  // }

  spotify.search({
    type: 'track',
    query: two
  }, function(err, data) {
    if (err) {
      return console.log('Error occured: ' + err);
    }
    // console.log(data);
    console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
    console.log("The Song's Name: " + data.tracks.items[0].name);
    console.log("A Preview Link of the Song: " + data.tracks.items[0].external_urls.spotify);
    console.log("Album: " + data.tracks.items[0].album.name);
    fs.appendFile('log.txt', "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song Name: " + data.tracks.items[0].name + "\n" + "Preview Link: " + data.tracks.items[0].external_urls.spotify + "\n" + "Album: " +
      data.tracks.items[0].album.name + "\n" + "====================================================\n");
  });
}


// Part Three: Get Movie from OMBD Api
function movieThis() {
  request('http://www.omdbapi.com/?t=' + two + "&plot=short&apikey=40e9cece", function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Released: " + JSON.parse(body).Released);
      console.log("Imdb Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoUserRating);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      fs.appendFile('log.txt', "\nTitle: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Rating: " + JSON.parse(body).tomatoUserRating + "\nCountry: " + JSON.parse(body).Country +
        "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + "\n======================================================");
    } else {
      console.log(error);
    }
  });
}
// Part Four: Do What It Says LIRI
function doThis() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      console.log(error);
    } else {
      var dataArray = data.split(",");
      var one = dataArray[0];
      var two = dataArray[1];
    }
  });
}




switch (one) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyThis();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doThis();
    break;
  default:
    console.log('LIRI does not understand');
}
