import { redisHost, redisPort } from '../keys/keys';

const asyncRedis = require('async-redis');

export const redisClient = asyncRedis.createClient({
  host: redisHost,
  port: redisPort,
  retry_strategy: () => 1000,
});
