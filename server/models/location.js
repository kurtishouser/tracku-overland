const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  type: String,
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

    // trip (present when using trip functionality in iOS app)
    start: Date,
    "end-coordinates": [Number],
    type: {type: String},
    stopped_automatically: Boolean,
    mode: String,
    "start-coordinates": [Number],
    end: Date,
    duration: Number,
    distance: Number,
    steps: Number,

    // tracking stats (present when option enabled in iOS app)
    pauses: Boolean,
    deferred: Number,
    significant_change: Number,
    locations_in_payload: Number,
    activity: String,
    desired_accuracy: Number,
  },
}, {timestamps: true});

module.exports = mongoose.model('Location', locationSchema);
