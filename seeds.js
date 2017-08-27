var mongoose  = require("mongoose"),
    moment    = require('moment'),
    Movie     = require("./models/movie");

// Hardcode the days for the sake of simplicity
var days    = [ 'Today', 'Tomorrow', moment().add(2, 'days').format('ddd, MMM D') ];
// Same for the times
var times   = [ '9:00 AM', '11:10 AM', '12:00 PM', '1:50 PM', '4:30 PM', '6:00 PM', '7:10 PM', '9:45 PM' ];


var data = [
  {
    title: 'La La Land',
    poster: 'https://i.imgur.com/po7UezG.jpg',
    genre: 'Drama/Romance',
    days: days,
    times: times,
  },
  {
    title: 'Paterson',
    poster: 'https://i.imgur.com/pE0C9E0.jpg',
    genre: 'Drama/Comedy',
    days: days,
    times: times,
  },
  {
    title: 'Jackie',
    poster: 'https://i.imgur.com/VqUi1sw.jpg',
    genre: 'Drama/Biography',
    days: days,
    times: times,
  },
  {
    title: 'Lo and Behold Reveries of the Connected World',
    poster: 'https://i.imgur.com/s106X7S.jpg',
    genre: 'Documentary',
    days: days,
    times: times,
  },
  {
    title: '10 Cloverfield Lane',
    poster: 'https://i.imgur.com/kV2BVdH.jpg',
    genre: 'Drama',
    days: days,
    times: times,
  },
  {
    title: 'Birth of a Nation',
    poster: 'https://i.imgur.com/a6HJj8S.jpg',
    genre: 'Fantasy/Myster',
    days: days,
    times: times,
  },
  {
    title: 'De Palma',
    poster: 'https://i.imgur.com/oOIa73M.jpg',
    genre: 'Documentary',
    days: days,
    times: times,
  },
  {
    title: 'Doctor Strange',
    poster: 'https://i.imgur.com/kyHDVOk.jpg',
    genre: 'Fantasy/Science Fiction',
    days: days,
    times: times,
  },
  {
    title: 'Eddie the Eagle',
    poster: 'https://i.imgur.com/GNrdAuF.jpg',
    genre: 'Drama/Sport',
    days: days,
    times: times,
  },
  {
    title: 'Pride and prejudice and zombies',
    poster: 'https://i.imgur.com/KhbG0Lw.jpg',
    genre: 'Thriller/Action',
    days: days,
    times: times,
  },
  {
    title: 'Finding Dory',
    poster: 'https://i.imgur.com/BTexHYJ.jpg',
    genre: 'Comedy/Adventure',
    days: days,
    times: times,
  },
  {
    title: 'Green Room',
    poster: 'https://i.imgur.com/Q0Ysh7L.jpg',
    genre: 'Crime/Thriller',
    days: days,
    times: times,
  },
  {
    title: 'Kubo and the Two Strings',
    poster: 'https://i.imgur.com/uTFCKZc.jpg',
    genre: 'Fantasy/Adventure',
    days: days,
    times: times,
  },
  {
    title: 'In a Valley of Violence',
    poster: 'https://i.imgur.com/DTtJ62G.jpg',
    genre: 'Drama/Western',
    days: days,
    times: times,
  },
  {
    title: 'O.J.: Made in America',
    poster: 'https://i.imgur.com/T8uc6x8.jpg',
    genre: 'Documentary',
    days: days,
    times: times,
  },
  {
    title: 'Rogue One: A Star Wars Story',
    poster: 'https://i.imgur.com/zOF2iYc.jpg',
    genre: 'Science Fiction/Action',
    days: days,
    times: times,
  },
  {
    title: 'Sing Street',
    poster: 'https://i.imgur.com/C3ExEb6.jpg',
    genre: 'Drama/Romance',
    days: days,
    times: times,
  },
  {
    title: 'Zoolander 2',
    poster: 'https://i.imgur.com/ejlIijD.jpg',
    genre: 'Comedy',
    days: days,
    times: times,
  },
]

function seedDB(){
  //Remove all movies
  Movie.remove({},function(err){
    if(err){
      console.log(err);
    } else
    console.log("removed movies!!!");

    //add movies
    data.forEach(function(seed){
      Movie.create(seed,function(err,movie){
        if(err){
          console.log(err);
        } else {
          console.log("Successfully added to the DB!");
        }
          movie.save();
          console.log(movie);
        });
      });
    });
  };
module.exports = seedDB;
