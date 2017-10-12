/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

// Require Event model in our routes module
const Event = require('../models/eventModel');

/* GET Events */
router.get('/events/:currentLatitude/:currentLongitude', (req, res) => {
    // Get current location from Get method parameters
    let currentLocation = {
        "currentLatitude": req.params.currentLatitude,
        "currentLongitude": req.params.currentLongitude
    };
    let eventAndDistanceMapArray = [];
    Event.find((err, events) => {
        if (err) {
            console.log(err);
        } else {
            events.forEach((eachEvent) => {
                // Get eachDistance between each event location and current location
                let eachLatitude = eachEvent.latitude;
                let eachLongitude = eachEvent.longitude;
                let eachDistance = Number(getDistance(eachLatitude, eachLongitude,
                    currentLocation.currentLatitude, currentLocation.currentLongitude)).toFixed(2);
                let eachEventAndDistanceMap = {
                    result: eachEvent,
                    distance: Number(eachDistance)
                };
                eventAndDistanceMapArray.push(eachEventAndDistanceMap);
            });
            res.json(eventAndDistanceMapArray);
        }
    });
});

/* GET Event in the shortest distance */
router.get('/event/:currentLatitude/:currentLongitude', (req, res) => {
    // Get current location from Get method parameters
    let currentLocation = {
        "currentLatitude": req.params.currentLatitude,
        "currentLongitude": req.params.currentLongitude
    };
    Event.find((err, events) => {
        if (err) {
            console.log(err);
        } else {
            let distanceArray = [];
            let eventAndDistanceMapArray = [];
            events.forEach((eachEvent) => {
                // Get eachDistance between each event location and current location
                let eachLatitude = eachEvent.latitude;
                let eachLongitude = eachEvent.longitude;
                let eachDistance = Number(getDistance(eachLatitude, eachLongitude,
                    currentLocation.currentLatitude, currentLocation.currentLongitude)).toFixed(2);
                let eachEventAndDistanceMap = {
                    result: eachEvent,
                    distance: Number(eachDistance)
                };
                // Construct distanceArray and eventAndDistanceMapArray
                distanceArray.push(eachDistance);
                eventAndDistanceMapArray.push(eachEventAndDistanceMap);
            });
            // Sort distance in ascending order
            distanceArray.sort(function (a, b) {
                return a - b;
            });
            // Get shortest distance is the first item in distanceArray
            let shortestDistance = distanceArray[0];
            console.log('Shortest Distance: ' + shortestDistance);

            // Get event service info which is in the shortest distance
            let eventInShorestDistanceMap = null;
            eventAndDistanceMapArray.forEach((eachEventAndDistanceMap) => {
                if (eachEventAndDistanceMap.distance == shortestDistance) {
                    eventInShorestDistanceMap = eachEventAndDistanceMap;
                }
            });
            console.log(eventInShorestDistanceMap);
            res.json(eventInShorestDistanceMap);
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