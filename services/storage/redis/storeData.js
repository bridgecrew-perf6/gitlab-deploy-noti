import redisClient from "./RedisClient.js";

const EXP = 86400; // 1 day

const storeData = (key, val) => {
  redisClient.client.setEx(key, EXP, val);
};

export { storeData };
