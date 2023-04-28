import { Request, Response, NextFunction } from "express";

export default async function rateLimiterMiddleware(
  request: Request,
  response: Record<string, any>,
  next: NextFunction,
  success: boolean
) {
  if (!success) {
    response.status = 429;
    response.json = "Too many requests. Please try again in a few minutes.";

    return;
  }

  next();
}
