import { Request, Response, NextFunction } from "express";
import morgan, { StreamOptions } from "morgan";
import requestIp from "request-ip";
import Loggger from "../configs/logger";
import rateLimiter from "../services/rateLimiter";

const LIMIT_PER_MINUTE = process.env.REDIS_LIMIT_PER_MINUTE || 10;
const LIMIT_DURATION = process.env.REDIS_LIMIT_DURATION || 60;

export default async function rateLimiterMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const clientIp: string = requestIp.getClientIp(request)!;
  const result = await rateLimiter(
    clientIp,
    parseInt(LIMIT_PER_MINUTE as string, 10),
    parseInt(LIMIT_DURATION as string, 10)
  );

  response.setHeader("X-RateLimit-Limit", result.limit);
  response.setHeader("X-RateLimit-Remaining", result.remaining);

  if (!result.success) {
    Loggger.error(`Exceeded request limit by client with IP ${clientIp}`);
    response
      .status(429)
      .json("Too many requests. Please try again in a few minutes.");

    return;
  }

  next();
}
