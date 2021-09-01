var express = require("express");
const app = express.Router();


const envr = 'PRODUCTION'
// const envr = 'DEVELOPMENT'

const sess = function(req, res, next) {
    if (envr == "PRODUCTION") {
        if (typeof req.session.DATA == 'undefined') {

            res.redirect(base_url);
            res.end();
        } else {
            next()
        }
    } else {
        req.session.DATA = [{
                id: 1,
                code: 'FL01',
                email: 'shivam@gmail.com',
                pwd: '1234'
            },
            { status: 1 }
        ]
        next()
    }
}

const { hotel_booking } = require("../controllers/admin-hotel");

app.get('/hotel-bookings',sess, hotel_booking);


module.exports = app;