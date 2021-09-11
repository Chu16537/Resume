const redis = require('./redis');

module.exports.getData = async (Id) => {
    const Redis = redis.get();
    const key = `key/{${Id}}`
    return Redis.hgetall(key);
};