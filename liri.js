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
var Spotify = require('node-spotify-api');


function spotifyThis(){
    // var default = "The Sign";
    // if (two !== undefined) {
    //   default = two;
    // }

    spotify.search({type: 'track', query: queryInput}, function(err,data){
      if (err) {
        return console.log('Error occured: ' + err);
      }

      console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
      console.log("The Song's Name: " + data.tracks.items[0].name);
      console.log("A Preview Link of the Song: " + data.tracks.items[0].external_urls.spotify);
      console.log("Album: " + data.tracks.items[0].album.name);
    fs.appendFile('log.txt', "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song Name: " + data.tracks.items[0].name + "\n" + "Preview Link: " + data.tracks.items[0].external_urls.spotify + "\n" + "Album: " +
    data.tracks.items[0].album.name + "\n" + "====================================================");
  });
}

// Part Three: Get Movie from OMBD Api

function movieThis(){
   var movieName = "Mr. Nobody";
   if (two !== undefined) {
    //  default = two;
   }
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

function doThis(){
  fs.readFile("random.txt", "utf8", function(error,data)
  {
    if(error){
      console.log(error);
    }
    else {
      var dataArray = data.split(",");
      var one = dataArray[0];
      var two = dataArray[1];
      switch(one) {
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
          function spotifyThis(){
              // var default = "The Sign";
              // if (two !== undefined) {
              //   default = two;
              // }

              spotify.search({type: 'track', query: queryInput}, function(err,data){
                if (err) {
                  return console.log('Error occured: ' + err);
                }

                console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
                console.log("The Song's Name: " + data.tracks.items[0].name);
                console.log("A Preview Link of the Song: " + data.tracks.items[0].external_urls.spotify);
                console.log("Album: " + data.tracks.items[0].album.name);
                fs.appendFile('log.txt', "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song Name: " + data.tracks.items[0].name + "\n" + "Preview Link: " + data.tracks.items[0].external_urls.spotify + "\n" + "Album: " +
                data.tracks.items[0].album.name + "\n" + "====================================================");
              });
            }
            spotifyThis();
            break;
        case "movie-this":
            function movieThis(){
               var movieName = "Mr. Nobody";
               if (two !== undefined) {
                //  default = two;
               }
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
            movieThis();
            break;
      }
    }
  });
}

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
}
