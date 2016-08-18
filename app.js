var mongo_url = process.env.MONGODB_URI ||
  'mongodb://localhost/mymdb_db';
var jwt_secret = 'supercali';

//require mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(mongo_url);


//require installed modules
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

// require express module
var express = require('express');

//run express
var app = express();

//set up the port
var port = process.env.PORT || 5000;
app.set('port', port);

//set all the middlewares

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//express-jwt
app.use(
  expressJWT({
    secret: jwt_secret
  })
  .unless({
    path: [ '/api/signup',
            '/api/login',
    {
      url: '/api/movies',
      methods: ['GET']
    },
    {
      url: '/api/actors',
      methods: ['GET']
    },
    {
      url: new RegExp('/api.*/', 'i'),
      methods: ['GET']
    }
  ]
  })
);

//let's set the routes to list all the movies

//Movie MDB API Models list

// //requiring the movie module
// var Movie = require('./models/movie');
// var Actor = require('./models/actor');
// var User = require('./models/user');

// //signup routes
// app.post('/signup', function(req, res) {
//   // res.send(req.body);
//   //set variable for the posted requests
//   var user_object = req.body;
//   //set new user object
//   var new_user = new User(user_object);
//   //save the new user object
//   new_user.save(function(err, user) {
//     if (err) return res.status(400).send(err);
//
//     return res.status(200).send({
//       message: 'User created'
//     });
//   });
// });
//
// //login routes
// app.post('/login', function(req, res) {
//   // return res.send(req.body);
//
//   var loggedin_user = req.body;
//
//   User.findOne(loggedin_user, function(err, found_user) {
//     if (err) return res.status(400).send(err);
//
//     // console.log(found_user.length);
//     if (found_user) {
//       var payload = found_user.id;
//       var expiryObj = {
//         expiryInMinutes: 60
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
//   });
// });
//encapsulating api routes
var api_routes = require('./config/routes');
app.use('/api', api_routes);

// app.route('/movies/:movie_id')
//   .get(function(req, res, next) {
//     var movie_id = req.params.movie_id;
//     // res.send('movie_id is ' + movie_id );
//     //comment comment
//     Movie.findOne({
//       _id: movie_id
//     }, function(err, movie) {
//       if (err) return next(err);
//
//       res.json(movie);
//     });
//   })
//   .put(function(req, res, next) {
//     // console.log(req.body);
//     var movie_id = req.params.movie_id;
//     Movie.findByIdAndUpdate(movie_id, req.body,
//       function(err, movie) {
//         if (err) return next(err);
//
//         res.json(movie);
//       });
//   });
//
// //list all movies
// //must be set before the port
// app.route('/movies')
//   .get(function(req, res) {
//     Movie.find().exec(function(err, movies) {
//       if (err) return next(err);
//
//       res.json(movies);
//     });
//   })
//   .post(function(req, res, next) {
//     console.log(req.body);
//     var new_movie = new Movie(req.body);
//     new_movie.save(function(err) {
//       if (err) return res.send(400, err);
//       res.json(new_movie);
//     });
//   });
//
// //set routes for actors
//
//
// app.route('/actors/:actor_name')
//   .get(function(req, res, next) {
//     var actor_name = req.params.actor_name;
//     // res.send('actor_id is ' + actor_id );
//     Actor.find()
//       .byName(actor_name)
//       .exec(function(err, actor) {
//         res.json(actor);
//       });
//
//     // Actor.findOne({
//     //   _id: actor_name
//     // }, function(err, actor) {
//     //   if(err) return next(err);
//     //
//     //     res.json(actor);
//     // });
//   })
//   .put(function(req, res, next) {
//     // console.log(req.body);
//     var actor_id = req.params.actor_id;
//     Actor.findByIdAndUpdate(actor_id, req.body,
//       function(err, actor) {
//         if (err) return next(err);
//
//         Actor.findOne({
//             _id: actor_id
//           },
//           function(err, actor) {
//             if (err) return next(err);
//             res.json(actor);
//           });
//
//       });
//   });
//
// //list all actors
// app.route('/actors')
//   .get(function(req, res) {
//     Actor.find().exec(function(err, actors) {
//       if (err) return next(err);
//
//       res.json(actors);
//     });
//   })
//   .post(function(req, res) {
//     console.log(req.body);
//     var new_actor = new Actor(req.body);
//
//     new_actor.save(function(err) {
//       if (err) {
//         console.log(
//           'error message is: ' +
//           err.errors.email.message
//         );
//         var error_message = {
//           "message": err.errors.email.message,
//           "status_code": 400
//         };
//         return res.status(400).send(err);
//       }
//       res.json(new_actor);
//     });
//   });


//listening to the port
app.listen(app.get('port'), function() {
  console.log('running on port: ' + app.get('port'));
});

module.exports = app;
