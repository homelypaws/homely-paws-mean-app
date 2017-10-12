/*jshint esversion: 6 */
const mongoose = require('mongoose');

// WifiHotspot Schema
const wifiHotspotSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
}, {
    collection: 'wifi-hotspot-collection'
});

module.exports = mongoose.model('WifiHotspot', wifiHotspotSchema);