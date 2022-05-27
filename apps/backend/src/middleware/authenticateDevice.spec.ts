import { Request, Response, NextFunction } from 'express';

import { deviceAuthToken } from '../config';
import authenticateDevice from '../middleware/authenticateDevice';

describe('authenticateDevice() middleware', () => {
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  const createMockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);

    return res;
  };

  beforeEach(() => {
    mockResponse = createMockResponse();
    mockNext = jest.fn();
  });

  it("should respond with status 401 and { error: 'no token provided' } if no authToken is provided", () => {
    const mockRequest: Partial<Request> = { query: {} };

    authenticateDevice(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'no token provided',
    });
  });

  it("should respond with status 401 and { error: 'invalid token' } if provided authToken is invalid", () => {
    const mockRequest: Partial<Request> = { query: { authToken: 'bad-token' } };

    authenticateDevice(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'invalid token',
    });
  });

  it('should call next() if provided authToken is valid', () => {
    const mockRequest: Partial<Request> = {
      query: { authToken: deviceAuthToken },
    };

    authenticateDevice(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction
    );

    expect(mockNext).toBeCalledTimes(1);
  });
});
