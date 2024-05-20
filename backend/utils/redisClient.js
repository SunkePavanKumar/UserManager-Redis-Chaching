import redis from "redis";

async function connect() {
  try {
    const redisClient = redis.createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      password: process.env.REDIS_PASSWORD,
    });

    await redisClient.connect();

    redisClient.on("error", (err) => console.error("Redis Client Error:", err));

    console.log("Connected to Redis successfully!");
    return redisClient;
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    throw error;
  }
}

export default connect;
