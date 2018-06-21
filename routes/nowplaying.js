var express     = require("express"),
    router      = express.Router(),
    moment      = require('moment'),
    request     = require("request"),
    fetch       = require("node-fetch"),
    bodyParser  = require("body-parser");

var apiKey      = '0eb48fbecf1e41443e5deadaea7521f7';
var urls        = {
                nowPlaying: 'https://api.themoviedb.org/3/movie/now_playing?api_key=',
                popular: 'https://api.themoviedb.org/3/movie/popular?api_key=',
                top_rated: 'https://api.themoviedb.org/3/movie/top_rated?api_key=',
                upcoming: 'https://api.themoviedb.org/3/movie/upcoming?api_key=',
                singleMovieInfo: 'https://api.themoviedb.org/3/movie/',
                movieInfobyTitle: 'https://api.themoviedb.org/3/search/movie?api_key=',
                };

var imgSize     = {
                  img92: 'https://image.tmdb.org/t/p/w92/',
                  img130: 'https://image.tmdb.org/t/p/w130/',
                  img185: 'https://image.tmdb.org/t/p/w185/',
                  img396: 'https://image.tmdb.org/t/p/w396',
                  img500: 'https://image.tmdb.org/t/p/w500/',
                };

// Index Route
router.get('/', async(req,res) => {
    try {
      let nowPlaying    = urls.nowPlaying +apiKey;
        const response  = await fetch(nowPlaying);
        let movieData   = await response.json();
        // console.log(movieData);
          res.render("nowplaying/index",{movieData: movieData});
    } catch (e) {
      console.log(e);
    }
});

// SHOW- Show info about one movie
router.get("/:id", async (req,res) => {
  try {
    let ID                = req.params.id;
    let movieInfobyTitle  = urls.movieInfobyTitle +apiKey+ '&query=' +ID;
      const response      = await fetch(movieInfobyTitle);
      let foundMovie      = await response.json();
      // console.log(foundMovie);
        let singleMovieInfo    = urls.singleMovieInfo +foundMovie.results[0].id+'?api_key='+apiKey;
        let singleMovieCredits = urls.singleMovieInfo +foundMovie.results[0].id+'/credits?api_key='+apiKey;
        let nowPlaying         = urls.nowPlaying +apiKey;
        let youtube            = 'http://api.themoviedb.org/3/movie/' +foundMovie.results[0].id+ '/videos?api_key='+apiKey+'&language=en-US';
        let recommendations    = 'https://api.themoviedb.org/3/movie/' +foundMovie.results[0].id+ '/recommendations?api_key='+apiKey+'&language=en-US&page=1';
          // singleMovieInfo
          try {
            const singleMovieRequest  = await fetch(singleMovieInfo);
            var   info                = await singleMovieRequest.json();
            console.log(info);
          } catch (e) {
            console.log(e);
          }
          // youtube
          try {
            const YoutubeRequest  = await fetch(youtube);
            var   video           = await YoutubeRequest.json();
          } catch (e) {
            console.log(e);
          }
          // singleMovieCredits
          try {
            const singleMovieCreditsRequest = await fetch(singleMovieCredits);
            var   credit                    = await singleMovieCreditsRequest.json();
          } catch (e) {
            console.log(e);
          }
          //recommendations
          try {
              const recommendationsRequest  = await fetch(recommendations);
              var   recommend               = await recommendationsRequest.json();
          } catch (e) {
            console.log(e);
          }
          //currPlaying
          try {
              const nowPlayingRequest       = await fetch(nowPlaying);
              var currPlaying               = await nowPlayingRequest.json();
          } catch (e) {
            console.log(e);
          }
          res.render("nowplaying/show",{
            Movie: info,
            Video: video,
            Credit: credit,
            Recommend: recommend,
            currPlaying: currPlaying,
            layout:false,
            session: req.session
  });
}
    catch (e) {
    console.log(e)
  }
});

module.exports = router;
