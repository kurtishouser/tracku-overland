import { startDate, addLocalTimeProperties } from './time';
import * as location from '../_testing/sample-data/location.json';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);

describe('Time Utility Functions', () => {
  describe('startDate()', () => {
    it("should return Date object with today's date/time (UTC) if no date provided", () => {
      const date = startDate({ query: {} } as any);

      expect(date).toBeInstanceOf(Date);
      expect(date).toEqual(
        new Date(
          new Date().setHours(0, 0, 0, 0) -
            new Date().getTimezoneOffset() * 60 * 1000
        )
      );
    });

    it('should return Date object with the date/time (UTC) provided', () => {
      const date = startDate({ query: { date: '2022-01-01' } } as any);

      expect(date).toBeInstanceOf(Date);
      expect(date).toEqual(new Date('2022-01-01'));
    });

    it('should return invalid Date object if invalid date provided', () => {
      const date = startDate({ query: { date: 'Invalid Date' } } as any);

      expect(date).toBeInstanceOf(Date);
      expect(date.toString()).toEqual('Invalid Date');
    });
  });

  describe('addLocalTimeProperties()', () => {
    // hack? interface expects Date for timestamp instead of string
    const mutatedLocation = {
      ...location,
      properties: {
        ...location.properties,
        timestamp: new Date(location.properties.timestamp), // mutation
      },
    };

    const mutatedLocationProperties = addLocalTimeProperties(mutatedLocation);

    it('should return a new properties object', () => {
      expect(typeof mutatedLocationProperties).toBe('object');
      expect(mutatedLocationProperties).not.toEqual(location.properties);
    });

    it('should keep existing properties', () => {
      expect(mutatedLocationProperties).toMatchObject({
        ...mutatedLocation.properties,
      });
    });

    it('should add local time properties with the correct values', () => {
      expect(mutatedLocationProperties).toMatchObject({
        local_date: 'Tuesday January 1st, 2019',
        local_time: '8:00:00 am',
        local_time_zone: 'America/Los_Angeles',
        local_timestamp: '2019-01-01T08:00:00-08:00',
      });
    });
  });
});
