'use strict';

var init = function () {
	var defaultConfig = require('./config.json');
	if(process.env.NODE_ENV === 'production') {
		var redisURI 		= require('url').parse(process.env.REDIS_URL);
		var redisPassword 	= redisURI.auth.split(':')[1];
		return {
			db: {
				username: process.env.dbUsername || defaultConfig.db.username,
				password: process.env.dbPassword || defaultConfig.db.dbPassword,
				host: process.env.dbHost || defaultConfig.db.dbHost,
				port: process.env.dbPort || defaultConfig.db.dbPort,
				name: process.env.dbName || defaultConfig.db.dbName,
				fullUri: process.env.fullDBUri
			},
			sessionSecret: process.env.sessionSecret || defaultConfig.sessionSecret,
			facebook: {
				clientID: process.env.facebookClientID || defaultConfig.facebook.facebookClientID,
				clientSecret: process.env.facebookClientSecret || defaultConfig.facebook.facebookClientSecret,
				callbackURL: "/auth/facebook/callback",
				profileFields: ['id', 'displayName', 'photos']
			},
			twitter:{
				consumerKey: process.env.twitterConsumerKey || defaultConfig.twitter.twitterConsumerKey,
				consumerSecret: process.env.twitterConsumerSecret || defaultConfig.twitter.twitterConsumerSecret,
				callbackURL: "/auth/twitter/callback",
				profileFields: ['id', 'displayName', 'photos']
			},
			redis: {
				host: redisURI.hostname || defaultConfig.redis.hostname,
				port: redisURI.port || defaultConfig.redis.port,
				password: redisPassword || defaultConfig.redis.redisPassword
			}
		}
	}
	else {
		return require('./config.json');
	}
}

module.exports = init();
