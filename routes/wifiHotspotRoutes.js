/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

// Require WifiHotspot model in our routes module
const WifiHotspot = require('../models/wifiHotSpotModel');

/* GET WifiHotspots */
router.get('/wifiHotspots/:currentLatitude/:currentLongitude', (req, res) => {
    // Get current location from Get method parameters
    let currentLocation = {
        "currentLatitude": req.params.currentLatitude,
        "currentLongitude": req.params.currentLongitude
    };
    let wifiHotspotAndDistanceMapArray = [];
    WifiHotspot.find((err, wifiHotspots) => {
        if (err) {
            console.log(err);
        } else {
            wifiHotspots.forEach((eachWifiHotspot) => {
                // Get eachDistance between each wifiHotspot location and current location
                let eachLatitude = eachWifiHotspot.latitude;
                let eachLongitude = eachWifiHotspot.longitude;
                let eachDistance = Number(getDistance(eachLatitude, eachLongitude,
                    currentLocation.currentLatitude, currentLocation.currentLongitude)).toFixed(2);
                let eachWifiHotspotAndDistanceMap = {
                    result: eachWifiHotspot,
                    distance: Number(eachDistance)
                };
                wifiHotspotAndDistanceMapArray.push(eachWifiHotspotAndDistanceMap);
            });
            res.json(wifiHotspotAndDistanceMapArray);
        }
    });
});

/* GET WifiHotspot in the shortest distance */
router.get('/wifiHotspot/:currentLatitude/:currentLongitude', (req, res) => {
    // Get current location from Get method parameters
    let currentLocation = {
        "currentLatitude": req.params.currentLatitude,
        "currentLongitude": req.params.currentLongitude
    };
    WifiHotspot.find((err, wifiHotspots) => {
        if (err) {
            console.log(err);
        } else {
            let distanceArray = [];
            let wifiHotspotAndDistanceMapArray = [];
            wifiHotspots.forEach((eachWifiHotspot) => {
                // Get eachDistance between each wifiHotspot location and current location
                let eachLatitude = eachWifiHotspot.latitude;
                let eachLongitude = eachWifiHotspot.longitude;
                let eachDistance = Number(getDistance(eachLatitude, eachLongitude,
                    currentLocation.currentLatitude, currentLocation.currentLongitude)).toFixed(2);
                let eachWifiHotspotAndDistanceMap = {
                    result: eachWifiHotspot,
                    distance: Number(eachDistance)
                };
                // Construct distanceArray and wifiHotspotAndDistanceMapArray
                distanceArray.push(eachDistance);
                wifiHotspotAndDistanceMapArray.push(eachWifiHotspotAndDistanceMap);
            });
            // Sort distance in ascending order
            distanceArray.sort(function (a, b) {
                return a - b;
            });
            // Get shortest distance is the first item in distanceArray
            let shortestDistance = distanceArray[0];
            console.log('Shortest Distance: ' + shortestDistance);

            // Get wifiHotspot service info which is in the shortest distance
            let wifiHotspotInShorestDistanceMap = null;
            wifiHotspotAndDistanceMapArray.forEach((eachWifiHotspotAndDistanceMap) => {
                if (eachWifiHotspotAndDistanceMap.distance == shortestDistance) {
                    wifiHotspotInShorestDistanceMap = eachWifiHotspotAndDistanceMap;
                }
            });
            console.log(wifiHotspotInShorestDistanceMap);
            res.json(wifiHotspotInShorestDistanceMap);
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