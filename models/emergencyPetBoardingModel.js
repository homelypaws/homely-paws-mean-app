/*jshint esversion: 6 */
const mongoose = require('mongoose');

// EmergencyPetBoarding Schema
const emergencyPetBoardingSchema = mongoose.Schema({
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
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
}, {
    collection: 'emergency-pet-boarding-collection'
});

module.exports = mongoose.model('EmergencyPetBoarding', emergencyPetBoardingSchema);