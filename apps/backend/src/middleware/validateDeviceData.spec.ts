import { Request, Response, NextFunction } from 'express';

import validateDeviceData from './validateDeviceData';

describe('validateDeviceData() middleware', () => {
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

  it("should respond with status 400 and { error: 'data is not in the proper format' } if no locations data provided", () => {
    const mockRequest: Partial<Request> = { body: {} };

    validateDeviceData(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'data is not in the proper format',
    });
  });
});
