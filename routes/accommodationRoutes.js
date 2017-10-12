/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

// Require Accommodation model in our routes module
const Accommodation = require('../models/accommodationModel');

/* GET Accommodations */
router.get('/accommodations/:currentLatitude/:currentLongitude', (req, res) => {
    // Get current location from Get method parameters
    let currentLocation = {
        "currentLatitude": req.params.currentLatitude,
        "currentLongitude": req.params.currentLongitude
    };
    let accommodationAndDistanceMapArray = [];
    Accommodation.find((err, accommodations) => {
        if (err) {
            console.log(err);
        } else {
            accommodations.forEach((eachAccommodation) => {
                // Get eachDistance between each accommodation location and current location
                let eachLatitude = eachAccommodation.latitude;
                let eachLongitude = eachAccommodation.longitude;
                let eachDistance = Number(getDistance(eachLatitude, eachLongitude,
                    currentLocation.currentLatitude, currentLocation.currentLongitude)).toFixed(2);
                let eachAccommodationAndDistanceMap = {
                    result: eachAccommodation,
                    distance: Number(eachDistance)
                };
                accommodationAndDistanceMapArray.push(eachAccommodationAndDistanceMap);
            });
            res.json(accommodationAndDistanceMapArray);
        }
    });
});

/* GET Accommodation in the shortest distance */
router.get('/accommodation/:currentLatitude/:currentLongitude', (req, res) => {
    // Get current location from Get method parameters
    let currentLocation = {
        "currentLatitude": req.params.currentLatitude,
        "currentLongitude": req.params.currentLongitude
    };
    Accommodation.find((err, accommodations) => {
        if (err) {
            console.log(err);
        } else {
            let distanceArray = [];
            let accommodationAndDistanceMapArray = [];
            accommodations.forEach((eachAccommodation) => {
                // Get eachDistance between each accommodation location and current location
                let eachLatitude = eachAccommodation.latitude;
                let eachLongitude = eachAccommodation.longitude;
                let eachDistance = Number(getDistance(eachLatitude, eachLongitude,
                    currentLocation.currentLatitude, currentLocation.currentLongitude)).toFixed(2);
                let eachAccommodationAndDistanceMap = {
                    result: eachAccommodation,
                    distance: Number(eachDistance)
                };
                // Construct distanceArray and accommodationAndDistanceMapArray
                distanceArray.push(eachDistance);
                accommodationAndDistanceMapArray.push(eachAccommodationAndDistanceMap);
            });
            // Sort distance in ascending order
            distanceArray.sort(function (a, b) {
                return a - b;
            });
            // Get shortest distance is the first item in distanceArray
            let shortestDistance = distanceArray[0];
            console.log('Shortest Distance: ' + shortestDistance);

            // Get accommodation service info which is in the shortest distance
            let accommodationInShortestDistanceMap = null;
            accommodationAndDistanceMapArray.forEach((eachAccommodationAndDistanceMap) => {
                if (eachAccommodationAndDistanceMap.distance == shortestDistance) {
                    accommodationInShortestDistanceMap = eachAccommodationAndDistanceMap;
                }
            });
            console.log(accommodationInShortestDistanceMap);
            res.json(accommodationInShortestDistanceMap);
        }
    });
});

/**
 * Transfer from angle to radian
 *
 * @param angle
 * @returns {number}
 */
function toRadians(angle) {
    return angle * Math.PI / 180;
}

/**
 * Calculate distance between two latitude-longitude points
 *
 * @param latitude1
 * @param longitude1
 * @param latitude2
 * @param longitude2
 * @returns {number}
 */
function getDistance(latitude1, longitude1, latitude2, longitude2) {
    const EARTH_RADIUS = 6371; // unit:km
    let latitudeRadian1 = toRadians(latitude1);
    let latitudeRadian2 = toRadians(latitude2);
    let phi = toRadians((latitude2 - latitude1));
    let lambda = toRadians((longitude2 - longitude1));
    let temp1 = Math.sin(phi / 2) * Math.sin(phi / 2) +
        Math.cos(latitudeRadian1) * Math.cos(latitudeRadian2) *
        Math.sin(lambda / 2) * Math.sin(lambda / 2);
    let temp2 = 2 * Math.atan2(Math.sqrt(temp1), Math.sqrt(1 - temp1));
    return EARTH_RADIUS * temp2;
}

module.exports = router;