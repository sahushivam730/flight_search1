var express = require("express");
const app = express.Router();

// const envr = 'PRODUCTION'
const envr = 'DEVELOPMENT'

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

const { login, logout, loginPost, dashboard, users, carddetails, air_booking, air_booking_details, set_markup_fair, set_markup_fair_update,carBookings,air_billing } = require("../controllers/admin");

//login//
app.get('/', login)
app.get('/login', login)
app.post('/login', loginPost)
app.get('/logout',sess, logout)
app.get('/dashboard',sess, dashboard)
app.get('/users',sess, users)
app.get('/users/card-details/:code',sess, carddetails)
app.get('/air-bookings',sess, air_booking)
app.get('/air-bookings/:id',sess, air_booking_details)
app.get('/set-markup-fair',sess, set_markup_fair)
app.post('/set-markup-fair',sess, set_markup_fair_update)
app.get('/car-bookings',sess,carBookings)
app.get('/air-billing/:id',sess,air_billing)

module.exports = app;