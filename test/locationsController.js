const { expect } = require('chai');
const sinon = require('sinon');

const locationsController = require('../server/controllers/locations');
const locations = require('../server/services/locations');

describe('Locations Controller', () => {
  const mockResponse = () => {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
  };
  const next = () => {};

  beforeEach(() => res = mockResponse());

  describe('getLocations()', () => {
    let fetchAllStub;
    beforeEach(() => fetchAllStub = sinon.stub(locations, 'fetchAll'));
    afterEach(() => fetchAllStub.restore());

    const req = {
      query: {},
    };
    
    it('should call next() with thrown 500 error if accessing the database fails', async () => {
      fetchAllStub.throws();
      const next = sinon.spy();

      await locationsController.getLocations(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(next.firstCall.args[0]).to.be.an('error');
      expect(next.firstCall.args[0].statusCode).to.equal(500);
    });

    it('should respond with status 200 when fetching data is successful', async () => {
      fetchAllStub.returns([]);

      await locationsController.getLocations(req, res, next);

      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

  describe('createLocations()', () => {
    let addAllStub;
    beforeEach(() => addAllStub = sinon.stub(locations, 'addAll'));
    afterEach(() => addAllStub.restore());

    const req = {
      body: {
        locations: [],
      },
    };

    it('should call next() with thrown 500 error if accessing the database fails', async () => {
      addAllStub.throws();
      const next = sinon.spy();

      await locationsController.createLocations(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(next.firstCall.args[0]).to.be.an('error');
      expect(next.firstCall.args[0].statusCode).to.equal(500);
    });

    it('should respond with status 200 and { result: \'ok\' } when fetching data is successful', async () => {
      addAllStub.returns([]);

      await locationsController.createLocations(req, res, next);
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith({ result: 'ok' })).to.be.true;
    });
  });
});
