'use strict';

var config = require('../config');
var Mongoose = require('mongoose');
var logger = require('../logger');

// Connect to the database
// construct the database URI and encode username and password.
// var dbURI = config.db.fullUri || ("mongodb://" +
// 			encodeURIComponent(config.db.username) + ":" +
// 			encodeURIComponent(config.db.password) + "@" +
// 			config.db.host + ":" +
// 			config.db.port + "/" +
// 			config.db.name + "?ssl=true");
var dbURI = process.env.fullDBUri;
Mongoose.connect(dbURI, {useNewUrlParser: true});

// Throw an error if the connection fails
Mongoose.connection.on('error', function (err) {
  if (err) throw err;
  console.log("Connect to DB Successful")
});

// mpromise (mongoose's default promise library) is deprecated,
// Plug-in your own promise library instead.
// Use native promises
Mongoose.Promise = global.Promise;

module.exports = {
  Mongoose,
  models: {
    user: require('./schemas/user.js'),
    room: require('./schemas/room.js')
  }
};
