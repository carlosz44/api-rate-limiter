import { NextFunction, Request, Response } from "express";
import requestFilterMiddleware from "../../src/middlewares/requestFilter";

describe("Request filter middleware", () => {
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

  test("It returns the same request payload if all parameters are valid", async () => {
    mockRequest = {
      body: {
        message1: "Valid message 1",
        message2: "Valid message 2",
        message3: "Valid message 2",
      },
    };
    requestFilterMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toBeCalledTimes(1);
    expect(Object.keys(mockRequest.body).length).toEqual(3);
  });
  test("It returns only the request payload parameter values that are not null or undefined", async () => {
    mockRequest = {
      body: {
        message1: "Valid message 1",
        message2: null,
        message3: undefined,
      },
    };
    requestFilterMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toBeCalledTimes(1);
    expect(Object.keys(mockRequest.body).length).toEqual(1);
  });
});
