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

var spotifyThis = function(songName) {

  spotify.search({
    type: 'track',
    query: songName
  }, function(err, data) {
    if (err) {
      return console.log('Error occured: ' + err);
    }

    var spotifySong = data.tracks.items;
    for (var i = 0; i < spotifySong.length; i++) {
      console.log(i);
      console.log("Artist(s): " + spotifySong[i].artists.map(getArtistNames));
      console.log("The Song's Name: " + spotifySong[i].name);
      console.log("A Preview Link of the Song: " + spotifySong[i].preview_url);
      console.log("Album: " + spotifySong[i].album.name);
      fs.appendFile('log.txt', "Artist: " + spotifySong[i].artists.map(getArtistNames + "\nSong Name: " + spotifySong[i].name + "\nPreview Link: " + spotifySong[i].preview_url + "\nAlbum: " +
        spotifySong[i].album.name + "\n===================================================="));
    }
  });
}

// Part Three: Get Movie from OMBD Api

var movieThis = function (movieName){

      request('http://www.omdbapi.com/?t=' + movieName + "&tomatoes=true", function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var movieData = JSON.parse(body);
              console.log("Title: " + movieData.Title);
              console.log("Release Year: " + movieData.Year);
              console.log("IMDB Rating: " + movieData.imdbRating);
              console.log("Rotten Tomatoes Rating: " + movieData.tomatoUserRating);
              console.log("Country: " + movieData.Country);
              console.log("Language: " + movieData.Language);
              console.log("Plot: " + movieData.Plot);
              console.log("Actors: " + movieData.Actors);
            fs.appendFile('log.txt',"Title: " + movieData.Title + "\n" + "Release Year: " + movieData.Year + "\n" + "IMDB Rating: " + movieData.imdbRating + "\n" +
           "Rotten Tomatoes Rating: " + movieData.tomatoUserRating + "\n" + "Country: " + movieData.Country + "\n" + "Language: " + movieData.Language + "\n" +
           "Plot: " + movieData.Plot + "\n" + "Actors: " + movieData.Actors + "\n" + "======================================================");
          }
          else {
              console.log(error);
          }
});
}

// Part Four: Do What It Says LIRI
//
var doThis = function(){
  fs.readFile("random.txt", "utf8", function(err,data){
    if(err) throw err;

      var dataArray = data.split(",");

    if (dataArray.length==2){
      pick(dataArray[0],dataArray[1]);
    } else if (dataArray.length==1){
      pick(dataArray[0]);
    }
  });
}

var pick = function (one, two){
switch(one) {
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
}

var pickFunction = function(one,two){
  pick(one,two);
}
