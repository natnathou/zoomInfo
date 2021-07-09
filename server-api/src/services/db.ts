import redis from 'redis';
import { promisify } from 'util';
import { redisHost, redisPort } from '../keys/keys';

const client = redis.createClient({
  host: redisHost,
  port: parseInt(redisPort),
  retry_strategy: () => 1000,
});

export const setAsync = promisify(client.set).bind(client);
export const getAsync = promisify(client.get).bind(client);
