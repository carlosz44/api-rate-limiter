import { Request, Response, NextFunction } from "express";
import rateLimiter from "../services/rateLimiter";
import requestIp from "request-ip";

const LIMIT_PER_MINUTE = process.env.REDIS_LIMIT_PER_MINUTE || 10;
const LIMIT_DURATION = process.env.REDIS_LIMIT_PER_MINUTE || 60;

export default async function rateLimiterMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const result = await rateLimiter(
    requestIp.getClientIp(request)!,
    parseInt(LIMIT_PER_MINUTE as string, 10),
    parseInt(LIMIT_DURATION as string, 10)
  );

  response.setHeader("X-RateLimit-Limit", result.limit);
  response.setHeader("X-RateLimit-Remaining", result.remaining);

  if (!result.success) {
    response
      .status(429)
      .json("Too many requests. Please try again in a few minutes.");

    return;
  }

  next();
}
