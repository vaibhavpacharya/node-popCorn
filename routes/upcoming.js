var express     = require("express"),
    router      = express.Router(),
    moment      = require('moment'),
    request     = require("request"),
    bodyParser  = require("body-parser");

var apiKey      = '0eb48fbecf1e41443e5deadaea7521f7';
var urls        = {
                nowPlaying: 'https://api.themoviedb.org/3/movie/now_playing?api_key=',
                popular: 'https://api.themoviedb.org/3/movie/popular?api_key=',
                top_rated: 'https://api.themoviedb.org/3/movie/top_rated?api_key=',
                upcoming: 'https://api.themoviedb.org/3/movie/upcoming?api_key=',
                singleMovieInfo: 'https://api.themoviedb.org/3/movie/',
                movieInfobyTitle: 'https://api.themoviedb.org/3/search/movie?api_key=',
                youtubeVideo:'https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key='
                };

var imgSize     = {
                  img92: 'https://image.tmdb.org/t/p/w92/',
                  img130: 'https://image.tmdb.org/t/p/w130/',
                  img185: 'https://image.tmdb.org/t/p/w185/',
                  img396: 'https://image.tmdb.org/t/p/w396',
                  img500: 'https://image.tmdb.org/t/p/w500/',
                };

// Index Route
router.get("/",function(req,res){
    var upcoming = urls.upcoming +apiKey;
    // load initial main movie
        request(upcoming, function(err,response,body){
          if(err){
            console.log(err);
          }
          else{
            var movieData = JSON.parse(body);
            // console.log(movieData);
            res.render("upcoming/index",{movieData: movieData});
          }
  });
});

//SHOW- Show info about one movie
router.get("/:id",function(req,res){
  var ID = req.params.id;
  console.log(ID);
  var movieInfobyTitle = urls.movieInfobyTitle +apiKey+ '&query=' +ID;

  request(movieInfobyTitle, function(err,foundMovie){
    if(err){
      console.log(err);
    }else{
      //render the show page
      var body               = JSON.parse(foundMovie.body);
      var singleMovieInfo    = urls.singleMovieInfo +body.results[0].id+'?api_key='+apiKey;
      var singleMovieCredits = urls.singleMovieInfo +body.results[0].id+'/credits?api_key='+apiKey;
      var upcoming           = urls.upcoming +apiKey;
      var youtube            = 'http://api.themoviedb.org/3/movie/' +body.results[0].id+ '/videos?api_key='+apiKey+'&language=en-US';
      var recommendations    = 'https://api.themoviedb.org/3/movie/' +body.results[0].id+ '/recommendations?api_key='+apiKey+'&language=en-US&page=1';

      request(singleMovieInfo, function(err, singleMovie){
            if(err){
              console.log(err);
            } else {
              var info  = JSON.parse(singleMovie.body);
              // console.log(info);
              request(youtube, function(err, movieVideo){
                if(err){
                  console.log(err);
                } else {
                  var video = JSON.parse(movieVideo.body);
                  // console.log(video);
                  request(singleMovieCredits, function(err, movieCredits){
                  if(err){
                    console.log(err);
                  } else{
                    var credit = JSON.parse(movieCredits.body)
                    console.log(credit);
                    request(recommendations, function(err, movieRecommendations){
                      if(err){
                        console.log(err);
                      } else {
                        var recommend = JSON.parse(movieRecommendations.body)
                        // console.log(recommend);
                            request(upcoming, function(err, movieUpcoming){
                            if(err){
                              console.log(err);
                            } else {
                              var currUpcoming = JSON.parse(movieUpcoming.body);
                              res.render("upcoming/show",{
                                Movie: info,
                                Video: video,
                                Credit: credit,
                                Recommend: recommend,
                                currUpcoming: currUpcoming,
                                layout:false,
                                session: req.session
                              });
                          }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});
module.exports = router;
