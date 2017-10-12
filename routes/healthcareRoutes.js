/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

// Require Healthcare model in our routes module
const Healthcare = require('../models/healthcareModel');

/* GET Healthcares */
router.get('/healthcares/:currentLatitude/:currentLongitude', (req, res) => {
    // Get current location from Get method parameters
    let currentLocation = {
        "currentLatitude": req.params.currentLatitude,
        "currentLongitude": req.params.currentLongitude
    };
    let healthcareAndDistanceMapArray = [];
    Healthcare.find((err, healthcares) => {
        if (err) {
            console.log(err);
        } else {
            healthcares.forEach((eachHealthcare) => {
                // Get eachDistance between each healthcare location and current location
                let eachLatitude = eachHealthcare.latitude;
                let eachLongitude = eachHealthcare.longitude;
                let eachDistance = Number(getDistance(eachLatitude, eachLongitude,
                    currentLocation.currentLatitude, currentLocation.currentLongitude)).toFixed(2);
                let eachHealthcareAndDistanceMap = {
                    result: eachHealthcare,
                    distance: Number(eachDistance)
                };
                healthcareAndDistanceMapArray.push(eachHealthcareAndDistanceMap);
            });
            res.json(healthcareAndDistanceMapArray);
        }
    });
});

/* GET Healthcare in the shortest distance */
router.get('/healthcare/:currentLatitude/:currentLongitude', (req, res) => {
    // Get current location from Get method parameters
    let currentLocation = {
        "currentLatitude": req.params.currentLatitude,
        "currentLongitude": req.params.currentLongitude
    };
    Healthcare.find((err, healthcares) => {
        if (err) {
            console.log(err);
        } else {
            let distanceArray = [];
            let healthcareAndDistanceMapArray = [];
            healthcares.forEach((eachHealthcare) => {
                // Get eachDistance between each healthcare location and current location
                let eachLatitude = eachHealthcare.latitude;
                let eachLongitude = eachHealthcare.longitude;
                let eachDistance = Number(getDistance(eachLatitude, eachLongitude,
                    currentLocation.currentLatitude, currentLocation.currentLongitude)).toFixed(2);
                let eachHealthcareAndDistanceMap = {
                    result: eachHealthcare,
                    distance: Number(eachDistance)
                };
                // Construct distanceArray and healthcareAndDistanceMapArray
                distanceArray.push(eachDistance);
                healthcareAndDistanceMapArray.push(eachHealthcareAndDistanceMap);
            });
            // Sort distance in ascending order
            distanceArray.sort(function (a, b) {
                return a - b;
            });
            // Get shortest distance is the first item in distanceArray
            let shortestDistance = distanceArray[0];
            console.log('Shortest Distance: ' + shortestDistance);

            // Get healthcare service info which is in the shortest distance
            let healthcareInShortestDistanceMap = null;
            healthcareAndDistanceMapArray.forEach((eachHealthcareAndDistanceMap) => {
                if (eachHealthcareAndDistanceMap.distance == shortestDistance) {
                    healthcareInShortestDistanceMap = eachHealthcareAndDistanceMap;
                }
            });
            console.log(healthcareInShortestDistanceMap);
            res.json(healthcareInShortestDistanceMap);
        }
    });
});

/* GET Healthcares By Category*/
router.get('/healthcaresByCategory/:currentLatitude/:currentLongitude/:category', (req, res) => {
    // Get current location from Get method parameters
    let currentLocation = {
        "currentLatitude": req.params.currentLatitude,
        "currentLongitude": req.params.currentLongitude
    };
    let healthcareAndDistanceMapArray = [];
    Healthcare.find({
        'category': req.params.category
    }, (err, healthcares) => {
        if (err) {
            console.log(err);
        } else {
            healthcares.forEach((eachHealthcare) => {
                // Get eachDistance between each healthcare location and current location
                let eachLatitude = eachHealthcare.latitude;
                let eachLongitude = eachHealthcare.longitude;
                let eachDistance = Number(getDistance(eachLatitude, eachLongitude,
                    currentLocation.currentLatitude, currentLocation.currentLongitude)).toFixed(2);
                let eachHealthcareAndDistanceMap = {
                    result: eachHealthcare,
                    distance: Number(eachDistance)
                };
                healthcareAndDistanceMapArray.push(eachHealthcareAndDistanceMap);
            });
            res.json(healthcareAndDistanceMapArray);
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