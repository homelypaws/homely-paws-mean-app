/*jshint esversion: 6 */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/db');
const food = require('./routes/foodRoutes');
const accommodation = require('./routes/accommodationRoutes');
const emergencyPetBoarding = require('./routes/emergencyPetBoardingRoutes');
const healthcare = require('./routes/healthcareRoutes');
const petHealthcare = require('./routes/petHealthcareRoutes');
const wifiHotspot = require('./routes/wifiHotspotRoutes');
const eventInfo = require('./routes/eventRoutes');
var cors = require('cors');

mongoose.Promise = global.Promise;
// Connect to Mongoose
mongoose.connect(config.homelyPawsDB, {
    useMongoClient: true
}).then(
    () => {
        console.log('MongoDB is connected');
    },
    (err) => {
        console.log('Can not connect to the MongoDB' + err);
    }
);

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', food);
app.use('/', accommodation);
app.use('/', emergencyPetBoarding);
app.use('/', healthcare);
app.use('/', petHealthcare);
app.use('/', wifiHotspot);
app.use('/', eventInfo);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;