var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwt_secret = 'supercali';

//requiring the movie module
var Movie = require('../models/movie');
var Actor = require('../models/actor');
var User = require('../models/user');

//signup routes
router.post('/signup', function(req, res) {
  // res.send(req.body);
  //set variable for the posted requests
  var user_object = req.body;
  //set new user object
  var new_user = new User(user_object);
  //save the new user object
  new_user.save(function(err, user) {
    if (err) return res.status(400).send(err);

    return res.status(200).send({
      message: 'User created'
    });
  });
});

//login routes
router.post('/login', function(req, res) {
  // return res.send(req.body);

  // var user = req.body;//no need this anymore because we use req.body.email instead

//take email from req.body
//find user based on email
//get password based on user
//compare it with req.body.password

User.findOne({email: req.body.email}, function(err, user) {
    if (err) res.send(err);

    if (user) {
      //authenticate user by password
      user.authenticate(req.body.password,function(err,match_password){
        if(match_password){
          var payload = {
            id:user.id,
            email:user.email
          };
          // var expiryObj = {
          //   expiresIn: '10h'
          // };
          var jwt_token = jwt.sign(payload, jwt_secret);
          return res.status(200).send(jwt_token);
        }else{
          res.status(401).send({
            message: 'Invalid password'
          });
        }

      });
    }else {
        res.status(401).send({
          message: 'User not founded'
        });
      }

//   User.findOne(loggedin_user, function(err, found_user) {
//     if (err) return res.status(400).send(err);
//
//     // console.log(found_user.length);
//     if (found_user) {
//       var payload = found_user.id;
//       var expiryObj = {
//         expiryInMinutes: '3h'
//       };
//       var jwt_token = jwt.sign(payload, jwt_secret, expiryObj);
//
//
//       return res.status(200).send(jwt_token);
//     } else {
//       //this is login failed flow
//       return res.status(400).send({
//         message: 'login failed'
//       });
//     }
  });
});

router.route('/movies/:movie_id')
  .get(function(req, res, next) {
    var movie_id = req.params.movie_id;
    // res.send('movie_id is ' + movie_id );
    //comment comment
    Movie.findOne({
      _id: movie_id
    }, function(err, movie) {
      if (err) return next(err);

      res.json(movie);
    });
  })
  .put(function(req, res, next) {
    // console.log(req.body);
    var movie_id = req.params.movie_id;
    Movie.findByIdAndUpdate(movie_id, req.body,
      function(err, movie) {
        if (err) return next(err);

        res.json(movie);
      });
  });

//list all movies
//must be set before the port
router.route('/movies')
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
      if (err) return res.send(400, err);
      res.json(new_movie);
    });
  });

//set routes for actors


router.route('/actors/:actor_name')
  .get(function(req, res, next) {
    var actor_name = req.params.actor_name;
    // res.send('actor_id is ' + actor_id );
    Actor.find()
      .byName(actor_name)
      .exec(function(err, actor) {
        res.json(actor);
      });

    // Actor.findOne({
    //   _id: actor_name
    // }, function(err, actor) {
    //   if(err) return next(err);
    //
    //     res.json(actor);
    // });
  })
  .put(function(req, res, next) {
    // console.log(req.body);
    var actor_id = req.params.actor_id;
    Actor.findByIdAndUpdate(actor_id, req.body,
      function(err, actor) {
        if (err) return next(err);

        Actor.findOne({
            _id: actor_id
          },
          function(err, actor) {
            if (err) return next(err);
            res.json(actor);
          });

      });
  });

//list all actors
router.route('/actors')
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
      if (err) {
        console.log(
          'error message is: ' +
          err.errors.email.message
        );
        var error_message = {
          "message": err.errors.email.message,
          "status_code": 400
        };
        return res.status(400).send(err);
      }
      res.json(new_actor);
    });
  });

module.exports = router;
