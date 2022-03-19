import redisClient from "./RedisClient.js";

const readData = async (key) => {
  const val = await redisClient.client.get(key);
  return val;
};

export { readData };
