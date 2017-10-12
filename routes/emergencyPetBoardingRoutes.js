/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

// Require emergencyPetBoarding model in our routes module
const EmergencyPetBoarding = require('../models/emergencyPetBoardingModel');

/* GET EmergencyPetBoardings */
router.get('/emergencyPetBoardings/:currentLatitude/:currentLongitude', (req, res) => {
    // Get current location from Get method parameters
    let currentLocation = {
        "currentLatitude": req.params.currentLatitude,
        "currentLongitude": req.params.currentLongitude
    };
    let emergencyPetBoardingAndDistanceMapArray = [];
    EmergencyPetBoarding.find((err, emergencyPetBoardings) => {
        if (err) {
            console.log(err);
        } else {
            emergencyPetBoardings.forEach((eachEmergencyPetBoarding) => {
                // Get eachDistance between each emergencyPetBoarding location and current location
                let eachLatitude = eachEmergencyPetBoarding.latitude;
                let eachLongitude = eachEmergencyPetBoarding.longitude;
                let eachDistance = Number(getDistance(eachLatitude, eachLongitude,
                    currentLocation.currentLatitude, currentLocation.currentLongitude)).toFixed(2);
                let eachEmergencyPetBoardingAndDistanceMap = {
                    result: eachEmergencyPetBoarding,
                    distance: Number(eachDistance)
                };
                emergencyPetBoardingAndDistanceMapArray.push(eachEmergencyPetBoardingAndDistanceMap);
            });
            res.json(emergencyPetBoardingAndDistanceMapArray);
        }
    });
});

/* GET EmergencyPetBoarding in the shortest distance */
router.get('/emergencyPetBoarding/:currentLatitude/:currentLongitude', (req, res) => {
    // Get current location from Get method parameters
    let currentLocation = {
        "currentLatitude": req.params.currentLatitude,
        "currentLongitude": req.params.currentLongitude
    };
    EmergencyPetBoarding.find((err, emergencyPetBoardings) => {
        if (err) {
            console.log(err);
        } else {
            let distanceArray = [];
            let emergencyPetBoardingAndDistanceMapArray = [];
            emergencyPetBoardings.forEach((eachEmergencyPetBoarding) => {
                // Get eachDistance between each emergencyPetBoarding location and current location
                let eachLatitude = eachEmergencyPetBoarding.latitude;
                let eachLongitude = eachEmergencyPetBoarding.longitude;
                let eachDistance = Number(getDistance(eachLatitude, eachLongitude,
                    currentLocation.currentLatitude, currentLocation.currentLongitude)).toFixed(2);
                let eachEmergencyPetBoardingAndDistanceMap = {
                    result: eachEmergencyPetBoarding,
                    distance: Number(eachDistance)
                };
                // Construct distanceArray and emergencyPetBoardingAndDistanceMapArray
                distanceArray.push(eachDistance);
                emergencyPetBoardingAndDistanceMapArray.push(eachEmergencyPetBoardingAndDistanceMap);
            });
            // Sort distance in ascending order
            distanceArray.sort(function (a, b) {
                return a - b;
            });
            // Get shortest distance is the first item in distanceArray
            let shortestDistance = distanceArray[0];
            console.log('Shortest Distance: ' + shortestDistance);

            // Get emergencyPetBoarding service info which is in the shortest distance
            let emergencyPetBoardingInShortestDistanceMap = null;
            emergencyPetBoardingAndDistanceMapArray.forEach((eachEmergencyPetBoardingAndDistanceMap) => {
                if (eachEmergencyPetBoardingAndDistanceMap.distance == shortestDistance) {
                    emergencyPetBoardingInShortestDistanceMap = eachEmergencyPetBoardingAndDistanceMap;
                }
            });
            console.log(emergencyPetBoardingInShortestDistanceMap);
            res.json(emergencyPetBoardingInShortestDistanceMap);
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