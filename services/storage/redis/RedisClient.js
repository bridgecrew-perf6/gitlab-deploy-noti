import { createClient } from "redis";

class RedisClient {
  constructor() {
    this.client = null;
  }

  async connect(host, port) {
    this.client = createClient({
      url: `redis://${host}:${port}`
    });
    await this.client.connect();
    return this.client;
  }
}

export default new RedisClient();
