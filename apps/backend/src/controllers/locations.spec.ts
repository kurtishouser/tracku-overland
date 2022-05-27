import { Request, Response, NextFunction } from 'express';
import * as locationsController from './locations';

describe('Locations Controller', () => {
  describe('getLocations()', () => {
    const mockResponse = () => {
      const res: Partial<Response> = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      return res;
    };
    const mockNext: NextFunction = jest.fn();

    it('should return status 200 and empty array when no date is provided', async () => {
      const mockRequest: Partial<Request> = { query: { date: undefined } };
      const mockFetchLocations = jest.fn().mockReturnValue([]);
      const res = mockResponse();
      const fetchLocationsHandler = locationsController.getLocations(mockFetchLocations);

      await fetchLocationsHandler(mockRequest as Request, res as Response, mockNext as NextFunction);

      expect(mockFetchLocations).toBeCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should return status 400 and \'Invalid Date\' if invalid date provided', async () => {
      const mockRequest: Partial<Request> = { query: { date: 'invalid-date' } };
      const mockFetchLocations = jest.fn().mockReturnValue([]);
      const res = mockResponse();
      const fetchLocationsHandler = locationsController.getLocations(mockFetchLocations);

      await fetchLocationsHandler(mockRequest as Request, res as Response, mockNext as NextFunction);

      expect(mockFetchLocations).toBeCalledTimes(0);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('Invalid Date');
    });

    it('should call next() when fetchLocations() throws an error', async () => {
      const mockRequest: Partial<Request> = { query: { date: undefined } };
      const mockFetchLocations = jest.fn().mockRejectedValue(new Error('Fake Error'));
      const res = mockResponse();
      const fetchLocationsHandler = locationsController.getLocations(mockFetchLocations);

      await fetchLocationsHandler(mockRequest as Request, res as Response, mockNext as NextFunction);

      expect(mockNext).toBeCalledTimes(1);
    });
  });

  describe('createLocations()', () => {
    const mockRequest: Partial<Request> = { body: { locations: [] } };
    const mockResponse = () => {
      const res: Partial<Response> = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      return res;
    };
    const mockNext: NextFunction = jest.fn();

    it('should respond with status 200 and { result: \'ok\' } when fetching data is successful', async () => {
      const mockAddLocations = jest.fn().mockReturnValue([]);
      const res = mockResponse();
      const createLocationsHandler = locationsController.createLocations(mockAddLocations);

      await createLocationsHandler(mockRequest as Request, res as Response, mockNext as NextFunction);


      expect(mockAddLocations).toBeCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ result: 'ok' });
    });

    it('should call next() when addLocations() throws an error', async () => {
      const mockAddLocations = jest.fn().mockRejectedValue(new Error('Fake Error'));
      const res = mockResponse();
      const createLocationsHandler = locationsController.createLocations(mockAddLocations);

      await createLocationsHandler(mockRequest as Request, res as Response, mockNext as NextFunction);

      expect(mockNext).toBeCalledTimes(1);
    });
  });
});
