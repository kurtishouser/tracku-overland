type GeoPoint = {
  type: string;
  coordinates: number[];
};

type LocationProperties = {
  motion: string[];
  speed: number;
  battery_level: number;
  wifi: string;
  device_id: string;
  vertical_accuracy: number;
  horizontal_accuracy: number;
  timestamp: Date;
  altitude: number;
  battery_state: string;
  // optional tracking stats when enabled in iOS app
  pauses?: boolean;
  activity?: string;
  desired_accuracy?: number;
  deferred?: number;
  significant_change?: number;
  locations_in_payload?: number;
};

type Location = {
  type: string;
  geometry: GeoPoint;
  properties: LocationProperties;
};

interface ILocation {
  type: string;
  geometry: GeoPoint;
  properties: {
    motion: string[];
    speed: number;
    battery_level: number;
    wifi: string;
    device_id: string;
    vertical_accuracy: number;
    horizontal_accuracy: number;
    timestamp: Date;
    altitude: number;
    battery_state: string;
    // optional tracking stats when enabled in iOS app
    pauses?: boolean;
    deferred?: number;
    significant_change?: number;
    locations_in_payload?: number;
    activity?: string;
    desired_accuracy?: number;
    // trip complete
    type?: string;
    start?: Date;
    end?: Date;
    duration?: number;
    distance?: number;
    steps?: number;
    stopped_automatically?: boolean;
    mode?: string;
    start_location?: Location;
    end_location?: Location;
  };
}

interface ILocations extends Array<ILocation> {}

interface ITrip {
  distance: number;
  mode: string;
  start: Date;
  start_location: Location;
  current_location: Location;
}

export type { ILocation, ILocations, ITrip };
