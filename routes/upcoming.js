const express = require('express');

const router = express.Router();
const fetch = require('node-fetch');

const apiKey = '0eb48fbecf1e41443e5deadaea7521f7';
const urls = {
  nowPlaying: 'https://api.themoviedb.org/3/movie/now_playing?api_key=',
  popular: 'https://api.themoviedb.org/3/movie/popular?api_key=',
  top_rated: 'https://api.themoviedb.org/3/movie/top_rated?api_key=',
  upcoming: 'https://api.themoviedb.org/3/movie/upcoming?api_key=',
  singleMovieInfo: 'https://api.themoviedb.org/3/movie/',
  movieInfobyTitle: 'https://api.themoviedb.org/3/search/movie?api_key=',
  youtubeVideo: 'https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=',
};

const imgSize = {
  img92: 'https://image.tmdb.org/t/p/w92/',
  img130: 'https://image.tmdb.org/t/p/w130/',
  img185: 'https://image.tmdb.org/t/p/w185/',
  img396: 'https://image.tmdb.org/t/p/w396',
  img500: 'https://image.tmdb.org/t/p/w500/',
};
// index route
router.get('/', async (req, res) => {
  try {
    const upcoming = urls.upcoming + apiKey;
    // load initial main movie
    const response = await fetch(upcoming);
    const movieData = await response.json();
    res.render('upcoming/index', { movieData });
  } catch (e) {
    throw e;
  }
});

// SHOW- Show info about one movie
router.get('/:id', async (req, res) => {
  try {
    const ID = req.params.id;
    const movieInfobyTitle = `${urls.movieInfobyTitle + apiKey}&query=${ID}`;
    const response = await fetch(movieInfobyTitle);
    const foundMovie = await response.json();
    const singleMovieInfo = `${urls.singleMovieInfo +
      foundMovie.results[0].id}?api_key=${apiKey}`;
    const singleMovieCredits = `${urls.singleMovieInfo +
      foundMovie.results[0].id}/credits?api_key=${apiKey}`;
    const upcoming = urls.upcoming + apiKey;
    const youtube = `http://api.themoviedb.org/3/movie/${
      foundMovie.results[0].id
    }/videos?api_key=${apiKey}&language=en-US`;
    const recommendations = `https://api.themoviedb.org/3/movie/${
      foundMovie.results[0].id
    }/recommendations?api_key=${apiKey}&language=en-US&page=1`;
    // singleMovieInfo
    try {
      const singleMovieRequest = await fetch(singleMovieInfo);
      var info = await singleMovieRequest.json();
    } catch (e) {
      throw e;
    }
    // youtube
    try {
      const YoutubeRequest = await fetch(youtube);
      var video = await YoutubeRequest.json();
    } catch (e) {
      throw e;
    }
    // singleMovieCredits
    try {
      const singleMovieCreditsRequest = await fetch(singleMovieCredits);
      var credit = await singleMovieCreditsRequest.json();
    } catch (e) {
      throw e;
    }
    // recommendations
    try {
      const recommendationsRequest = await fetch(recommendations);
      var recommend = await recommendationsRequest.json();
    } catch (e) {
      throw e;
    }
    // toprated
    try {
      const currUpcomingRequest = await fetch(upcoming);
      var currUpcoming = await currUpcomingRequest.json();
    } catch (e) {
      throw e;
    }
    res.render('upcoming/show', {
      Movie: info,
      Video: video,
      Credit: credit,
      Recommend: recommend,
      currUpcoming,
      layout: false,
      session: req.session,
    });
  } catch (e) {
    throw e;
  }
});

module.exports = router;
