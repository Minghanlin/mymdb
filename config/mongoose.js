var config = require('mongoose');
module.exports = function(){
  var db = mongoose.connect(config.db);
  require('../models/actor');
  require('../models/movie');
  return db;
};
