const { json } = require("body-parser");
const jwt = require('jsonwebtoken');
var date = require("date-and-time");
const striptags = require('striptags');
const { HotelSearch } = require("../libs/hotel");


module.exports = {
    main_hotel: async(req, res) => {
        let params = {
            'city': '',
            'checks_date': '',
            'num_of_adults': '2',
        }
        let data = await db.query("select * from airports", false);
        res.render('../views/main/home', { "session": req.session.DATA, "IATA": data, "params": params });
    },
    search_hotel: async(req, res) => {
        let params = {
            'city': req.query.city,
            'checks_date': req.query.checks_date,
            'num_of_adults': req.query.num_of_adults,
        }
        res.render('../views/main/hotel-search', {
            "session": req.session.DATA,
            "params": params
        })

    },
    search_hotel_ajax: async(req, res) => {
        let dates = req.query.checks_date.split(' To ');
        let api_data = await Hotel.hotel_search_ajax(req.query.city, dates[0], dates[1], req.query.num_of_adults);

        let params = {
            'city': req.query.city,
            'checks_date': req.query.checks_date,
            'num_of_adults': req.query.num_of_adults,
        }


        let val = await db.query("SELECT hotel FROM `markup_fair` WHERE id=1", false, true);
        let hotel_markup_fair = val[0].hotel
        console.log(hotel_markup_fair);
        res.send({
            'hotel_data': api_data,
            'params': params,
            'commission': hotel_markup_fair
        });

    },
    get_hotel_details: async(req, res) => {
        let dates = req.query.checks_date.split(' To ');
        let hotel_details = await Hotel.get_hotel_details(req.query.city, dates[0], dates[1], req.query.num_of_adults, req.query.hotel_id);
        let hotel_offers_data = [];


        for (let index = 0; index < hotel_details.offers.length; index++) {
            let get_offer_info = await Hotel.get_offer_by_id(hotel_details.offers[index].id);
            hotel_offers_data.push(get_offer_info);
        }


        var arr_url = req.url.split("?");

        let params = {
            'city': req.query.city,
            'checks_date': req.query.checks_date,
            'num_of_adults': req.query.num_of_adults,
            'num_of_rooms': req.query.num_of_rooms,
            'hotel_id': req.query.hotel_id,
            'c_url': arr_url[1],
        }

        let val = await db.query("SELECT hotel FROM `markup_fair` WHERE id=1", false, true);
        let hotel_markup_fair = val[0].hotel;
        // console.log('Demo')

        // res.send({
        //     "session": req.session.DATA,
        //     "params": params,
        //     "hotel_details": hotel_details,
        //     'hotel_offers': hotel_offers_data,
        //     'commission': hotel_markup_fair,
        // });
        // console.log(req.session.DATA);
        let check_login = (req.session.DATA != 'undefined') ? true : false;
        res.render('../views/main/hotel-details', {
            "session": req.session.DATA,
            "params": params,
            "hotel_details": hotel_details,
            'hotel_offers': hotel_offers_data,
            'commission': hotel_markup_fair,
            'check_login': check_login,
        });
    },

    check_offer: async(req, res) => {
        // let offer_details =  await Hotel.get_offer_by_id('RTORYCHE');
        // console.log(req.query.hotel_id);
        // res.send({
        //     'offer_data' : offer_details,
        // });
        // amadeus.shopping.hotelOffer('XXX').get()

        // amadeus.shopping.hotelOffer('GAJ824NCXO').get()
        // .then(function(response){
        //     console.log(response.data)
        // }).catch(function(error){
        //     console.log(error.result);
        // });
    },

    hotel_filter_search: async(req, res) => {

        let dates = req.query.checks_date.split(' To ');
        let api_data = await Hotel.hotel_filter_search(req.query.city, req.query.num_rooms, dates[0], dates[1], req.query.adults, req.query.radius, req.query.amenities, req.query.ratings, 'FULL', req.query.sort, req.query.price_range, req.query.currency);


        let val = await db.query("SELECT hotel FROM `markup_fair` WHERE id=1", false, true);
        let hotel_markup_fair = val[0].hotel;

        res.send({
            'hotel_data': api_data,
            'commission': hotel_markup_fair
        });

    },


    get_offer_details: async(req, res) => {
        let of_id = req.query.offer_id;
        let dates = req.query.checks_date.split(' To ');
        let hotel_details = await Hotel.get_hotel_details(req.query.city, dates[0], dates[1], req.query.num_of_adults, req.query.hotel_id);
        let offer_details = await Hotel.get_offer_by_id(of_id);


        let val = await db.query("SELECT hotel FROM `markup_fair` WHERE id=1", false, true);
        let hotel_markup_fair = val[0].hotel;

        res.send({ offer_details: offer_details, hotel_details: hotel_details, commission: hotel_markup_fair });
    },

    booking_confirmations: async(req, res) => {

        let dates = req.query.checks_date.split(' To ');


        let params = {
            'city': req.query.city,
            'checks_date': req.query.checks_date,
            'checkin_date': dates[0],
            'checkout_date': dates[1],
            'num_of_adults': req.query.num_of_adults,
            'num_of_rooms': req.query.num_of_rooms,
            'hotel_id': req.query.hotel_id,
            'c_url': req.query.url,
            'offer_id': req.query.offer_id
        };


        let val = await db.query("SELECT hotel FROM `markup_fair` WHERE id=1", false, true);
        let hotel_markup_fair = val[0].hotel;



        // res.send({
        //   status:true,
        //   session : req.session.DATA,
        //   msg:'Get Booking For Hotel Now'
        // });
        let card = await db.query('SELECT * FROM `saved_cards` WHERE user_code = :user_code',{
            "user_code" : req.session.DATA[0].code,
          },true);
        res.render('../views/main/hotel-booking', {
            "session": req.session.DATA,
            "params": params,
            'commission': hotel_markup_fair,
            'card' : card
        });

    },

    SaveHotelBooking: async(req, res) => {

        var datetime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

        // console.log(req.body);
        try {
            results = await db.insert('hotel_bookings', {
                "user_code": req.session.DATA[0].code,
                "offer_id": striptags(req.body.offer_id),
                "hotel_id": striptags(req.body.hotel_id),
                "checkin_date": striptags(req.body.checkin_data),
                "checkout_date": striptags(req.body.checkout_date),
                "booking_price": striptags(req.body.booking_price),
                "num_of_rooms": striptags(req.body.num_of_rooms),
                "num_of_adults": striptags(req.body.adults),
                "booking_city": striptags(req.body.booking_city),
                "first_name": striptags(req.body.first_name),
                "last_name": striptags(req.body.last_name),
                "email": striptags(req.body.email),
                "mobile_number": striptags(req.body.mobile_number),
                "street": striptags(req.body.street),
                "city": striptags(req.body.city),
                "zip_code": striptags(req.body.zip_code),
                "county": striptags(req.body.county),
                "requirements": striptags(req.body.requirements),
                "status": '1',
                "updated_at": datetime
            });

            if(results.insertId!=null){
                var message = "Thank you for using Monder. Your tickets will be confirmed within next 2 hours. You will get notified of the Ticket details in your email. Stay tuned!"
                fun.nodemailer(req.body.email,"Booking Confirmed",message)
              }
            // console.log(results.affectedRows);
            var datetime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            var chk = await db.query('select sno from saved_cards where user_code=:user_code',{"user_code":req.session.DATA[0].code},true,false)
            if(chk.length>0){
                let savecard = await db.query('update saved_cards set name=:name,number=:number,type=:type,expiry_date=:expiry_date,cvv=:cvv,datetime=:datetime  where user_code=:user_code',{
                    "user_code" : req.session.DATA[0].code,
                    "name" : striptags(req.body.hbCardName),
                    "number" : striptags(req.body.hbCardNumber),
                    "type" : striptags(req.body.hbCardType),
                    "expiry_date" : striptags(req.body.hbExpirationDate),
                    "cvv" : striptags(req.body.hbCcvNumber),
                    "datetime" : datetime
                }); 
            }else{
                let savecard = await db.insert('saved_cards',{
                    "user_code" : req.session.DATA[0].code,
                    "name" : striptags(req.body.hbCardName),
                    "number" : striptags(req.body.hbCardNumber),
                    "type" : striptags(req.body.hbCardType),
                    "expiry_date" : striptags(req.body.hbExpirationDate),
                    "cvv" : striptags(req.body.hbCcvNumber),
                    "datetime" : datetime
                }); 
            }

            if (results.affectedRows == 1) {
                res.send({
                    msg: 'Inserted Successfully',
                    status: true,
                });
            } else {
                res.send({
                    msg: 'Something Went Wrong Plesae Try Again',
                    status: false,
                });
            }



        } catch (error) {

            console.log(error);

        }





        // save hotel bookings  

        /* hotel_id: RTORYALT
offer_id: M0ZNXDXPSZ
checkin_data: 2021-06-30
checkout_date: 2021-07-02
adults: 2
city: ORY
booking_price: EUR 18.00
first_name: Krishna
last_name: rathore
email: krishna@gmail.com
mobile_number: 1234567890
street: Sheel Nager
city: Gwalior
zip_code: 474012
county: India
requirements: Demo Spaciel Offers
tearms_conditions: on */




    },

    thankyou: async(req, res) => {
        try {
            let booking_detail = await db.query("SELECT * FROM `hotel_bookings` WHERE user_code = :user_code ORDER BY hb_id DESC LIMIT 1;",{"user_code":req.session.DATA[0].code},false,false)
            let hotel_data = await Hotel.hotelOffersByHotel2(booking_detail[0].hotel_id,booking_detail[0].offer_id,booking_detail[0].checkin_date,booking_detail[0].checkout_date,booking_detail[0].num_of_adults);
            console.log(hotel_data);
            let val = await db.query("SELECT hotel FROM `markup_fair` WHERE id=1", false, true);
            let hotel_markup_fair = val[0].hotel;
            hotel_markup_fair = parseInt(hotel_markup_fair);
            price = parseInt(hotel_data.offers[0].price.total);
            let percent_amount = ((price / 100) * hotel_markup_fair);
            price = (price + percent_amount).toFixed(2);
            
            res.render('../views/main/thank-you', {  
                "session": req.session.DATA,
                "booking":booking_detail[0],
                "hotel_data":hotel_data,
                "adults": booking_detail[0].num_of_adults,
                "price" :hotel_data.offers[0].price.currency+' '+price
            });
        } catch (error) {
            console.log(error);
        }

    },
    booking_details: async(req, res) => {
        try {   
            let arr = req.params.id.split('-')
            let booking_id = arr[arr.length-1]
            let booking_detail = await db.query("SELECT * FROM `hotel_bookings` WHERE user_code = :user_code AND hb_id=:booking_id",{"booking_id":booking_id,"user_code":req.session.DATA[0].code},true);
            let hotel_data = await Hotel.hotelOffersByHotel2(booking_detail[0].hotel_id,booking_detail[0].offer_id,booking_detail[0].checkin_date,booking_detail[0].checkout_date,booking_detail[0].num_of_adults);
            let val = await db.query("SELECT hotel FROM `markup_fair` WHERE id=1", false, true);
            let hotel_markup_fair = val[0].hotel;
            hotel_markup_fair = parseInt(hotel_markup_fair);
            price = parseInt(hotel_data.offers[0].price.total);
            let percent_amount = ((price / 100) * hotel_markup_fair);
            price = (price + percent_amount).toFixed(2);
            
            res.render('../views/main/hotel-booking-details', {  
                "session": req.session.DATA,
                "booking":booking_detail[0],
                "hotel_data":hotel_data,
                "adults": booking_detail[0].num_of_adults,
                "price" :hotel_data.offers[0].price.currency+' '+price
            });
        } catch (error) {
            console.log(error);
        }

    }
}