import { NextFunction, Request, Response } from "express";
import requestFilterMiddleware from "../../src/middlewares/requestFilter";

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });
});

// describe("Authorization middleware", () => {
//   let mockRequest: Partial<Request>;
//   let mockResponse: Partial<Response>;
//   let nextFunction: NextFunction = jest.fn();

//   beforeEach(() => {
//     mockRequest = {};
//     mockResponse = {
//       json: jest.fn(),
//     };
//   });

//   // test("it returns without headers", async () => {
//   //   const expectedResponse = {
//   //     error: "Missing JWT token from the 'Authorization' header",
//   //   };
//   //   requestFilterMiddleware(
//   //     mockRequest as Request,
//   //     mockResponse as Response,
//   //     nextFunction
//   //   );

//   //   expect(mockResponse.json).toBeCalledWith(expectedResponse);
//   // });

//   test("It returns with the next function if all request parameters are valid", async () => {
//     mockRequest = {
//       body: {
//         message1: "Valid message 1",
//         message2: "Valid message 2",
//         message3: "Valid message 3",
//       },
//     };
//     requestFilterMiddleware(
//       mockRequest as Request,
//       mockResponse as Response,
//       nextFunction
//     );

//     // expect(nextFunction).toBeCalledTimes(1);
//     // expect(Object.keys(response).length).toBeCalledTimes(1);
//   });
// });
