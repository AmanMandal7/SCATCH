const mongoose = require('mongoose');
const config = require('config');
const debug = require("debug")("development:mongoose")

mongoose
    .connect(`${config.get('MONGODB_URI')}/SCATCH`)
    .then(function () {
        debug('connected'); //removing clg and adding dbgr
    })
    .catch(function (err) {
        debug(err)
    });

module.exports = mongoose.connection;