const { expect } = require('chai');
const sinon = require('sinon');

const locationsController = require('../server/controllers/locations');
const locations = require('../server/services/locations');

describe('Locations Controller', () => {
  describe('getLocations()', () => {
    let fetchAllStub;

    beforeEach(() => {
      fetchAllStub = sinon.stub(locations, 'fetchAll');
    });
  
    afterEach(() => {
      fetchAllStub.restore();
    });

    const req = {
      query: {},
    };
    
    it('Should throw an error if accessing the database fails', async () => {
      fetchAllStub.throws();

      const result = await locationsController.getLocations(req, {});
      expect(result).to.be.an('error');
    });
  });
});
