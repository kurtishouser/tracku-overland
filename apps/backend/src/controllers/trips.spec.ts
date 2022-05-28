import { Request, Response, NextFunction } from 'express';
import * as tripsController from './trips';

describe('Trips Controller', () => {
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

  describe('getTrips()', () => {
    it('should return status 200 and empty array when no date is provided', async () => {
      const mockRequest: Partial<Request> = { query: { date: undefined } };
      const mockFetchTrips = jest.fn().mockReturnValue([]);
      const getTripsHandler =
        tripsController.getTrips(mockFetchTrips);

      await getTripsHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockFetchTrips).toBeCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([]);
    });

    it("should return status 400 and 'Invalid Date' if invalid date provided", async () => {
      const mockRequest: Partial<Request> = { query: { date: 'invalid-date' } };
      const mockFetchTrips = jest.fn().mockReturnValue([]);
      const getTripsHandler =
        tripsController.getTrips(mockFetchTrips);

      await getTripsHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockFetchTrips).toBeCalledTimes(0);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith('Invalid Date');
    });

    it('should call next() when fetchTrips() throws an error', async () => {
      const mockRequest: Partial<Request> = { query: { date: undefined } };
      const mockFetchTrips = jest
        .fn()
        .mockRejectedValue(new Error('Fake Error'));
      const getTripsHandler =
        tripsController.getTrips(mockFetchTrips);

      await getTripsHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockNext).toBeCalledTimes(1);
    });
  });
});
