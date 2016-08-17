
var mongo_url = process.env.MONGODB_URI ||
 'mongodb://localhost/mymdb_db';

//require mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(mongo_url);


//requiring the movie module
var Movie = require('./models/movie');
var Actor = require('./models/actor');



//require installed modules
var bodyParser = require('body-parser');

// require express module
var express = require('express');

//run express
var app = express();

//set up the port
var port = 5000;
app.set('port', port);

//set all the middlewares

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//let's set the routes to list all the movies

app.route('/movies/:movie_id')
  .get(function(req, res, next) {
    var movie_id = req.params.movie_id;
    // res.send('movie_id is ' + movie_id );
//comment comment
    Movie.findOne({
      _id: movie_id
    }, function(err, movie) {
      if(err) return next(err);

      res.json(movie);
    });
  })
    .put(function(req, res, next) {
    // console.log(req.body);
    var movie_id = req.params.movie_id;
    Movie.findByIdAndUpdate(movie_id, req.body,
    function(err, movie) {
      if(err) return next(err);

      res.json(movie);
    });
  });

//list all movies
//must be set before the port
app.route('/movies')
  .get(function(req, res) {
    Movie.find().exec(function(err, movies) {
      if (err) return next(err);

      res.json(movies);
    });
  })
  .post(function(req, res, next) {
    console.log(req.body);
    var new_movie = new Movie(req.body);
    new_movie.save(function(err) {
      if (err) return next(err);
      res.json(new_movie);
    });
  });

app.route('/actors/:actor_id')
  .get(function(req, res, next) {
    var actor_id = req.params.actor_id;
    // res.send('actor_id is ' + actor_id );
    Actor.findOne({
      _id: actor_id
    }, function(err, actor) {
      if(err) return next(err);

      res.json(actor);
    });
  })
    .put(function(req, res, next) {
    // console.log(req.body);
    var actor_id = req.params.actor_id;
    Actor.findByIdAndUpdate(actor_id, req.body,
    function(err, actor) {
      if(err) return next(err);

      res.json(actor);
    });
  });

//list all actors
app.route('/actors')
  .get(function(req, res) {
    Actor.find().exec(function(err, actors) {
      if (err) return next(err);

      res.json(actors);
    });
  })
  .post(function(req, res) {
    console.log(req.body);
    var new_actor = new Actor(req.body);
    new_actor.save(function(err) {
      if (err) return next(err);
      res.json(new_actor);
    });
  });


//listening to the port
app.listen(app.get('port'), function() {
  console.log('running on port: ' + app.get('port'));
});

module.exports =  app;
