import { Request, Response } from "express";
import Logger from "../configs/logger";

export async function apiGet(request: Request, response: Response) {
  try {
    response.json({
      message: "Hello from the API",
    });
  } catch (error) {
    Logger.error("Internal server error");
    response.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function apiPost(request: Request, response: Response) {
  try {
    response.json(request.body);
  } catch (error) {
    Logger.error("Internal server error");
    response.status(500).json({
      message: "Internal server error",
    });
  }
}
