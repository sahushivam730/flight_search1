var express = require("express");
const app = express.Router();

// const env = 'development';
const env = 'production';


const sess = function(req, res, next) {

    if (env == 'production') {
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

// const {home,flight,search_flights,flight_search2,getflightsByDest,searchIATA,travelerInfo,savetravelers,payment,savepaymentdetails,saveFlight} = require("../controllers/main");
// const {login} = require("../controllers/auth");

// app.get('/',home)
// app.get('/home',home)
// app.get('/flight/search',search_flights)
// app.post('/flight/search2',flight_search2)
// app.post('/search-flights-by-dest',getflightsByDest)
// app.post('/search-IATA',searchIATA)
// app.get('/flight',flight)
// app.get('/booking-traveler-info/:id/:trv',sess,travelerInfo)
// app.post('/save-travelers/:id/:trv',sess,savetravelers)
// app.get('/payment/',sess,payment)
// app.post('/save-card-details/',sess,savepaymentdetails)
// app.post('/saveFlight/',sess,saveFlight)

// //login//
// app.post('/login',login)

const { main_hotel, search_hotel, search_hotel_ajax, get_hotel_details, check_offer, hotel_filter_search, booking_confirmations, get_offer_details, SaveHotelBooking, thankyou,booking_details} = require('../controllers/hotel-control');
app.get('/hotel', main_hotel);
app.get('/search-hotel', search_hotel);
app.get('/search-hotel-ajax', search_hotel_ajax);
app.get('/hotel-details', get_hotel_details);
app.get('/check-hotel-offers', check_offer);
app.get('/hotel-filter-search', hotel_filter_search);
app.get('/hotel/booking-confirmation', sess, booking_confirmations);
app.get('/hotel/offer-details', get_offer_details);
app.post('/hotel/save-hotel-booking', sess, SaveHotelBooking);
app.get('/hotel/thank-you',sess, thankyou);
app.get('/hotel/booking-details/:id',sess, booking_details);
// https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=PAR&roomQuantity=1&adults=2&radius=5&radiusUnit=KM&paymentPolicy=NONE&includeClosed=false&bestRateOnly=true&view=FULL&sort=NONE
module.exports = app;