const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  type: {type: String},
  geometry: {
    type: {type: String},
    coordinates: [Number],
  },
  properties: {
    // standard
    motion: [String],
    speed: Number,
    battery_level: Number,
    wifi: String,
    device_id: String,
    vertical_accuracy: Number,
    horizontal_accuracy: Number,
    timestamp: Date,
    altitude: Number,
    battery_state: String,

    // trip complete (when using trip functionality in iOS app)
    // the defaults for coordinates and motion prevent persisting
    // empty data when there is no 'trip complete' data
    type: {type: String}, // 'trip'
    start: Date,
    end: Date,
    duration: Number,
    distance: Number,
    steps: Number,
    stopped_automatically: Boolean,
    mode: String,
    start_location: {
      type: {type: String},
      geometry: {
        type: {type: String},
        coordinates: {type: [Number], default: undefined},
      },
      properties: {
        motion: {type: [String], default: undefined},
        speed: Number,
        battery_level: Number,
        wifi: String,
        device_id: String,
        vertical_accuracy: Number,
        horizontal_accuracy: Number,
        timestamp: Date,
        altitude: Number,
        battery_state: String,
        // optional tracking stats (when enabled in iOS app)
        pauses: Boolean,
        deferred: Number,
        significant_change: Number,
        locations_in_payload: Number,
        activity: String,
        desired_accuracy: Number,
      },
    },
    end_location: {
      type: {type: String},
      geometry: {
        type: {type: String},
        coordinates: {type: [Number], default: undefined},
      },
      properties: {
        motion: {type: [String], default: undefined},
        speed: Number,
        battery_level: Number,
        wifi: String,
        device_id: String,
        vertical_accuracy: Number,
        horizontal_accuracy: Number,
        timestamp: Date,
        altitude: Number,
        battery_state: String,
      },
    },

    // optional tracking stats (when enabled in iOS app)
    pauses: Boolean,
    deferred: Number,
    significant_change: Number,
    locations_in_payload: Number,
    activity: String,
    desired_accuracy: Number,
  },
}, {timestamps: true, bufferCommands: false});

module.exports = mongoose.model('Location', locationSchema);
