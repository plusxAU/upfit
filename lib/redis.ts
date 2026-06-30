import Redis from "ioredis";

declare global {
  var _redis: Redis | undefined;
}

const redis: Redis =
  global._redis ??
  new Redis(process.env.UPFIT_STORAGE_REDIS_URL!, { lazyConnect: false });

if (process.env.NODE_ENV !== "production") {
  global._redis = redis;
}

export default redis;
