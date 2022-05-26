import { Request, Response, NextFunction } from 'express';
import * as locationsController from './locations';



describe('Locations Controller', () => {
  describe('createLocations()', () => {
    const mockRequest: Partial<Request> = { body:{locations: []}};
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

    it('should call next() when addLocation() throws error', async () => {
      const mockAddLocations = jest.fn().mockRejectedValue(new Error('Fake Error'));
      const res = mockResponse();
      const createLocationsHandler = locationsController.createLocations(mockAddLocations);

      await createLocationsHandler(mockRequest as Request, res as Response, mockNext as NextFunction);

      expect(mockNext).toBeCalledTimes(1);
    });
  });
});
