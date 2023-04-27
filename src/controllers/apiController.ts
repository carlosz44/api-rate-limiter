import { Request, Response } from "express";

export function getTest(request: Request, response: Response) {
  response.json({
    message: "Hello from the API",
  });
}

export function postTest(request: Request, response: Response) {
  response.json(request.body);
}
