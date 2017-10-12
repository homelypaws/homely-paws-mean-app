/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

// Require PetHealthcare model in our routes module
const PetHealthcare = require('../models/petHealthcareModel');

/* GET PetHealthcares */
router.get('/petHealthcares/:currentLatitude/:currentLongitude', (req, res) => {
    // Get current location from Get method parameters
    let currentLocation = {
        "currentLatitude": req.params.currentLatitude,
        "currentLongitude": req.params.currentLongitude
    };
    let petHealthcareAndDistanceMapArray = [];
    PetHealthcare.find((err, petHealthcares) => {
        if (err) {
            console.log(err);
        } else {
            petHealthcares.forEach((eachPetHealthcare) => {
                // Get eachDistance between each petHealthcare location and current location
                let eachLatitude = eachPetHealthcare.latitude;
                let eachLongitude = eachPetHealthcare.longitude;
                let eachDistance = Number(getDistance(eachLatitude, eachLongitude,
                    currentLocation.currentLatitude, currentLocation.currentLongitude)).toFixed(2);
                let eachPetHealthcareAndDistanceMap = {
                    result: eachPetHealthcare,
                    distance: Number(eachDistance)
                };
                petHealthcareAndDistanceMapArray.push(eachPetHealthcareAndDistanceMap);
            });
            res.json(petHealthcareAndDistanceMapArray);
        }
    });
});

/* GET PetHealthcare in the shortest distance */
router.get('/petHealthcare/:currentLatitude/:currentLongitude', (req, res) => {
    // Get current location from Get method parameters
    let currentLocation = {
        "currentLatitude": req.params.currentLatitude,
        "currentLongitude": req.params.currentLongitude
    };
    PetHealthcare.find((err, petHealthcares) => {
        if (err) {
            console.log(err);
        } else {
            let distanceArray = [];
            let petHealthcareAndDistanceMapArray = [];
            petHealthcares.forEach((eachPetHealthcare) => {
                // Get eachDistance between each petHealthcare location and current location
                let eachLatitude = eachPetHealthcare.latitude;
                let eachLongitude = eachPetHealthcare.longitude;
                let eachDistance = Number(getDistance(eachLatitude, eachLongitude,
                    currentLocation.currentLatitude, currentLocation.currentLongitude)).toFixed(2);
                let eachPetHealthcareAndDistanceMap = {
                    result: eachPetHealthcare,
                    distance: Number(eachDistance)
                };
                // Construct distanceArray and petHealthcareAndDistanceMapArray
                distanceArray.push(eachDistance);
                petHealthcareAndDistanceMapArray.push(eachPetHealthcareAndDistanceMap);
            });
            // Sort distance in ascending order
            distanceArray.sort(function (a, b) {
                return a - b;
            });
            // Get shortest distance is the first item in distanceArray
            let shortestDistance = distanceArray[0];
            console.log('Shortest Distance: ' + shortestDistance);

            // Get petHealthcare service info which is in the shortest distance
            let petHealthcareInShortestDistanceMap = null;
            petHealthcareAndDistanceMapArray.forEach((eachPetHealthcareAndDistanceMap) => {
                if (eachPetHealthcareAndDistanceMap.distance == shortestDistance) {
                    petHealthcareInShortestDistanceMap = eachPetHealthcareAndDistanceMap;
                }
            });
            console.log(petHealthcareInShortestDistanceMap);
            res.json(petHealthcareInShortestDistanceMap);
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