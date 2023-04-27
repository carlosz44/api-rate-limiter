import Redis from "ioredis";

type Result = {
  limit: number;
  remaining: number;
  success: boolean;
};

export default async function rateLimiter(
  client: Redis,
  ip: string,
  limit: number,
  duration: number
): Promise<Result> {
  const key = `rate_limit:${ip}`;
  const currentCount = await client.get(key);
  const count = parseInt(currentCount as string, 10) || 0;

  if (count <= limit) {
    return {
      limit,
      remaining: limit - count,
      success: false,
    };
  }

  client.incr(key);
  client.expire(key, duration);

  return {
    limit,
    remaining: limit - (count + 1),
    success: true,
  };
}
