/*jshint esversion: 6 */
const mongoose = require('mongoose');

// Accommodation Schema
const accommodationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    operatingHours: {
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
    collection: 'accommodation-collection'
});

module.exports = mongoose.model('Accommodation', accommodationSchema);