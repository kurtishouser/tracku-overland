import { Request, Response, NextFunction } from 'express';
import * as locationsController from './locations';

describe('Locations Controller', () => {
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

  describe('getLocations()', () => {
    it('should return status 200 and empty array when no date is provided', async () => {
      const mockRequest: Partial<Request> = { query: { date: undefined } };
      const mockFetchLocations = jest.fn().mockReturnValue([]);
      const getLocationsHandler =
        locationsController.getLocations(mockFetchLocations);

      await getLocationsHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockFetchLocations).toBeCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([]);
    });

    it("should return status 400 and 'Invalid Date' if invalid date provided", async () => {
      const mockRequest: Partial<Request> = { query: { date: 'invalid-date' } };
      const mockFetchLocations = jest.fn().mockReturnValue([]);
      const getLocationsHandler =
        locationsController.getLocations(mockFetchLocations);

      await getLocationsHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockFetchLocations).toBeCalledTimes(0);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith('Invalid Date');
    });

    it('should call next() when fetchLocations() throws an error', async () => {
      const mockRequest: Partial<Request> = { query: { date: undefined } };
      const mockFetchLocations = jest
        .fn()
        .mockRejectedValue(new Error('Fake Error'));
      const getLocationsHandler =
        locationsController.getLocations(mockFetchLocations);

      await getLocationsHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockNext).toBeCalledTimes(1);
    });
  });

  describe('createLocations()', () => {
    const mockRequest: Partial<Request> = { body: { locations: [] } };

    it("should respond with status 200 and { result: 'ok' } when fetching data is successful", async () => {
      const mockAddLocations = jest.fn().mockReturnValue([]);
      const createLocationsHandler =
        locationsController.createLocations(mockAddLocations);

      await createLocationsHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockAddLocations).toBeCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ result: 'ok' });
    });

    it('should call next() when addLocations() throws an error', async () => {
      const mockAddLocations = jest
        .fn()
        .mockRejectedValue(new Error('Fake Error'));
      const createLocationsHandler =
        locationsController.createLocations(mockAddLocations);

      await createLocationsHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockNext).toBeCalledTimes(1);
    });
  });
});
