import { Request, Response, NextFunction } from "express";
import morgan, { StreamOptions } from "morgan";
import requestIp from "request-ip";
import Logger from "../configs/logger";
import rateLimiter from "../services/rateLimiter";

const CONNECTIONS_LIMIT = process.env.CONNECTIONS_LIMIT || 10;
const LIMIT_DURATION_IN_SECONDS = process.env.LIMIT_DURATION_IN_SECONDS || 60;

export default async function rateLimiterMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const clientIp: string = requestIp.getClientIp(request)!;
  const result = await rateLimiter(
    clientIp,
    parseInt(CONNECTIONS_LIMIT as string, 10),
    parseInt(LIMIT_DURATION_IN_SECONDS as string, 10)
  );

  response.setHeader("X-RateLimit-Limit", result.limit);
  response.setHeader("X-RateLimit-Remaining", result.remaining);

  if (!result.success) {
    Logger.error(`Exceeded request limit by client with IP ${clientIp}`);
    response
      .status(429)
      .json("Too many requests. Please try again in a few minutes.");

    return;
  }

  next();
}
