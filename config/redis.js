const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session); // For connect-redis@6.x

// Create Redis client
const redisClient = redis.createClient();

// Handle Redis connection errors
redisClient.on('error', (err) => console.error('Redis error:', err));

// Export session middleware with Redis store
module.exports = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET, // Ensure this matches your .env file
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }, // 1 hour
});