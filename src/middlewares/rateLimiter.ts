import { Request, Response, NextFunction } from "express";
import Redis from "ioredis";
import rateLimiter from "../lib/rateLimiter";
import requestIp from "request-ip";

const LIMIT_PER_MINUTE = process.env.REDIS_LIMIT_PER_MINUTE || 10;
const LIMIT_DURATION = process.env.REDIS_LIMIT_PER_MINUTE || 60;

const client = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  password: process.env.REDIS_PASSWORD || "",
  port: 6379,
});
console.log(process.env.PORT, {
  host: process.env.REDIS_HOST!,
  password: process.env.REDIS_PASSWORD!,
  port: 6379,
});

export default async function rateLimiterMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const result = await rateLimiter(
    client,
    requestIp.getClientIp(request)!,
    parseInt(LIMIT_PER_MINUTE as string, 10),
    parseInt(LIMIT_DURATION as string, 10)
  );

  response.setHeader("X-RateLimit-Limit", result.limit);
  response.setHeader("X-RateLimit-Remaining", result.remaining);

  console.log(requestIp.getClientIp(request), process.env.PORT, result);

  if (!result.success) {
    response
      .status(429)
      .json("Too many requests. Please try again in a few minutes.");

    return;
  }

  next();
}
