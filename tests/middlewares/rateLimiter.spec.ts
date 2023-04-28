import { NextFunction, Request, Response } from "express";
import rateLimiterMiddleware from "./__mocks__/rateLimiterMiddleware";

describe("Rate limiter middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  test("It stops the api call and returns a HTTP 429 status code if the limiter verifies that api call has exceeded the limits", async () => {
    mockRequest = {
      body: {
        message: "Valid message",
      },
    };
    rateLimiterMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
      false
    );

    expect(mockResponse.status).toEqual(429);
    expect(mockResponse.json).toEqual(
      "Too many requests. Please try again in a few minutes."
    );
    expect(nextFunction).toBeCalledTimes(0);
  });
  test("It continues to next function if the limiter verifies that api call is within the rate limit", async () => {
    mockRequest = {
      body: {
        message: "Valid message",
      },
    };
    rateLimiterMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
      true
    );

    expect(nextFunction).toBeCalledTimes(1);
  });
});
