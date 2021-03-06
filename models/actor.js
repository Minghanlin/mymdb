// var mongo_url = 'mongodb://localhost/mymdb_db';
//require mongoose
var mongoose = require('mongoose');

//setting up how json structure would be
var actorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: [true, 'Email not found'],
    match: [/.+\@.+\..+/, 'Email is invalid']
  },
  age: Number,
  website: {
    type: String,
    trim: true,
    get: function(url) {
      if (!url) {
        return url;
      } else {
        if (
          url.indexOf('http://') !== 0 &&
          url.indexOf('https://') !== 0
        ) {
          url = 'http://' + url;
        }
        return url;
      }
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

//set a virtual attribute
actorSchema.virtual('fullName')
  .get(function() {
    return this.firstName + ' ' + this.lastName;
  })
  .set(function(fullName) {
    var splitName = fullName.split(" ");
    this.firstName = splitName[0];
    this.lastName = splitName[1];
  });

actorSchema.query = {
  byName: function(name) {
    return this.find({
      $or: [{
        firstName: new RegExp(name, 'i')
      }, {
        lastName: new RegExp(name, 'i')
      }]
    });
  }
};

//register the getter
actorSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

//register the Schema
var Actor = mongoose.model('Actor', actorSchema);

//make this available to our other files
module.exports = Actor;
