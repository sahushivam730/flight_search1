var express = require("express");
const app = express.Router();
const passport = require('passport');
require("../libs/passport-setup")
const envr = 'PRODUCTION'
// const envr = 'DEVELOPMENT'

app.use(passport.initialize());
app.use(passport.session());  

const sess = function(req, res, next) {
    if(envr == "PRODUCTION"){
        if (typeof req.session.DATA == 'undefined') {

            res.redirect(base_url);
            res.end();
        } else{
            next()
        }
    }else{
        req.session.DATA =  [
            {
                id: 1,
                code: 'FL01',
                username: 'Shivam',
                email: 'shivam@gmail.com',
                pwd: '1234'
              },
              { status: 1 }
        ]
        next()
    }    
}

const {home,flight,search_flights,flight_search2,getflightsByDest,searchIATA,travelerInfo,savetravelers,payment,savepaymentdetails,saveFlight,success,bookcar,booking_details,contact,savecontact,about,faq,terms_cond,elite} = require("../controllers/main");
const {login,signup,logout, myaccount, changePassword,verify,forgotpassword} = require("../controllers/auth");

app.get('/',flight)
app.get('/home',home)
app.get('/flight/search',search_flights)
app.post('/flight/search2',flight_search2)
app.post('/search-flights-by-dest',getflightsByDest)
app.post('/search-IATA',searchIATA)
app.get('/flight',flight)
app.get('/booking-traveler-info/:id/:trv',sess,travelerInfo)
app.post('/save-travelers/:id/:trv',sess,savetravelers)
app.get('/payment/',sess,payment)
app.post('/save-card-details/',sess,savepaymentdetails)
app.post('/saveFlight/',saveFlight)
app.get('/success',sess,success)
app.post('/bookcar',bookcar)
app.get('/booking-details/:id',sess,booking_details)
app.get('/contact/',contact)
app.post('/savecontact/',savecontact)
app.get('/about-us/',about)
app.get('/elite/',elite)
app.get('/faq/',faq)
app.get('/terms-and-cond/',terms_cond)
//login//
app.post('/login',login)
app.post('/signup',signup)
app.get('/logout',logout)
app.get('/myaccount',sess,myaccount)
app.get('/verify',verify)
app.post('/forgotpassword',forgotpassword)
app.post('/change-password',sess,changePassword)
//gooogl-signup API 
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    async function(req, res) {
        let data = await db.query("select * from users where email=:email",{"email":req.user._json.email},false,false) 
        if(data.length>0){
            data.push({"status":1})
            req.session.DATA = data
            res.redirect(base_url)
        }else{
            res.redirect(base_url)
        }
    });
module.exports = app;
