import redisClient from "./RedisClient.js";

const EXP = 604800; // 7 day

const storeData = (key, val) => {
  redisClient.client.setEx(key, EXP, val);
};

export { storeData };
