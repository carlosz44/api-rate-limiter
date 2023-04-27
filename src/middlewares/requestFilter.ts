import { Request, Response, NextFunction } from "express";

export default async function requestFilterMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (
    Object.values(request.body).some(
      (value) => value === null || value === undefined
    )
  ) {
    request.body = Object.fromEntries(
      Object.entries(request.body).filter(
        ([_, value]) => value !== null && value !== undefined
      )
    );
  }

  next();
}
