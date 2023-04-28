import { Request, Response } from "express";

export function apiGet(request: Request, response: Response) {
  response.json({
    message: "Hello from the API",
  });
}

export function apiPost(request: Request, response: Response) {
  response.json(request.body);
}
