/*jshint esversion: 6 */
const mongoose = require('mongoose');

// PetHealthcare Schema
const petHealthcareSchema = mongoose.Schema({
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
    collection: 'pet-healthcare-collection'
});

module.exports = mongoose.model('PetHealthcare', petHealthcareSchema);