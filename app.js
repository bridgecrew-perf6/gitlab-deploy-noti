import express from "express";
import cors from "cors";
import compression from "compression";
import router from "./router";
import config from "./config";
import { redisClient, storeData } from "./services/storage/redis";

const app = express();

async function lunchRedis() {
  await redisClient.connect("redis", 6379);
  storeData('aaa', 'bbbb')
}
lunchRedis();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cors());

app.use(router);

const port = config.app.port;
app.listen(port, () => {
  console.log(`app running...`);
});
