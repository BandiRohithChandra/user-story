const redis = require('redis');
const { promisify } = require('util');

const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

const storeSession = async (userId, sessionData) => {
  await setAsync(`session:${userId}`, JSON.stringify(sessionData));
};

const getSession = async (userId) => {
  const sessionData = await getAsync(`session:${userId}`);
  return sessionData ? JSON.parse(sessionData) : null;
};

const deleteSession = async (userId) => {
  await redisClient.del(`session:${userId}`);
};

module.exports = { storeSession, getSession, deleteSession };