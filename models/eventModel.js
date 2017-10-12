/*jshint esversion: 6 */
const mongoose = require('mongoose');

// Event Schema
const eventSchema = mongoose.Schema({
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
    collection: 'event-collection'
});

module.exports = mongoose.model('Event', eventSchema);