import { find } from 'geo-tz';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin
import AdvancedFormat from 'dayjs/plugin/advancedFormat';

import { ILocation } from '../interfaces/Location';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(AdvancedFormat);

const startDate = (date?: string) => {
  return date
    ? new Date(date as string)
    : new Date(
        new Date().setHours(0, 0, 0, 0) -
          new Date().getTimezoneOffset() * 60 * 1000
      );
};

const addLocalTimeProperties = (location: ILocation) => {
  const { geometry, properties } = location;
  // IANA time zone
  const locationTimeZone = find(
    geometry.coordinates[1],
    geometry.coordinates[0]
  )[0]; // can be multiple, only use the first element for now
  const localTime = dayjs(properties.timestamp).tz(locationTimeZone);

  return {
    ...properties,
    local_date: dayjs(localTime).format('dddd MMMM Do, YYYY'),
    local_time: dayjs(localTime).format('h:mm:ss a'),
    local_time_zone: locationTimeZone,
    local_timestamp: dayjs(localTime).format(),
  };
};

export { startDate, addLocalTimeProperties };
