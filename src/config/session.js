const session = require('express-session');
const Redis = require('ioredis');
const RedisStore = require('connect-redis')(session);

const redisClient = new Redis(process.env.REDIS_URL);

module.exports = session({
  name: 'session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
  cookie: {
    secure: false, // Defina true se for HTTPS
    maxAge: 3600000,
    httpOnly: true
  }
});
