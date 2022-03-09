const { expect } = require('chai');

const location = require('./overlandSampleData/singleLocation.json');
const { addLocalTimeProperties } = require('../server/utils/time');

describe('Time Utility Functions', () => {
  describe('addLocalTimeProperties()', () => {
    const updatedLocationProperties = addLocalTimeProperties(location);
  
    it('should return a new properties object', () => {
      expect(updatedLocationProperties).to.be.an('object');
      expect(updatedLocationProperties).to.not.equal(location.properties)
    });
    
    it('should add local time properties with the correct values' , () => {
      expect(updatedLocationProperties).to.have.property(
        'local_time_zone',
        'America/Los_Angeles'
      );
      expect(updatedLocationProperties).to.have.property(
        'local_timestamp',
        '2019-01-01T08:00:00-08:00'
      );
      expect(updatedLocationProperties).to.have.property(
        'local_time',
        '8:00:00 am'
      );
      expect(updatedLocationProperties).to.have.property(
        'local_date',
        'Tuesday January 1st, 2019'
      );
    });
  });
});
