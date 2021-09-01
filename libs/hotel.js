var Amadeus = require('amadeus');
// initializing Amadeus //
var amadeus = new Amadeus({
    clientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    clientSecret: 'xxxxxxxxxxxxxxxxxxxxxxxxx'
});

// initializing Amadeus //
let app = {}

app.HotelSearch = async function(city) {
    return new Promise(resolve => {
        amadeus.shopping.hotelOffers.get({
            cityCode: city
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            console.log(error.result);
        });
    })
}

app.hotel_search_ajax = async(city, checkin_dat, checkout_date, adults) => {


    return new Promise(resolve => {
        amadeus.shopping.hotelOffers.get({
            cityCode: city,
            roomQuantity: 1,
            adults: adults,
            radius: 5,
            checkInDate: checkin_dat,
            checkOutDate: checkout_date,
            radiusUnit: 'KM',
            paymentPolicy: 'NONE',
            includeClosed: 'false',
            bestRateOnly: 'true',
            view: 'FULL',
            sort: 'NONE',
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            console.log(error.result);
        });
    });
}


// https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=PAR&roomQuantity=1&adults=2&radius=5&radiusUnit=KM&amenities=WIFI,FITNESS_CENTER&ratings=4,3&paymentPolicy=NONE&includeClosed=false&bestRateOnly=true&view=FULL&sort=NONE

app.hotel_filter_search = async(cityCode, roomQuantity, checkin_dat, checkout_date, adults, radius, amenities = '', ratings = '', view = 'FULL', sort, price_range, currency) => {

    let price_range_d = price_range.replace(/€/, '');
    price_range_d = price_range_d.replace(/€/, '');
    price_range_d = price_range_d.replace(/ /, '');
    price_range_d = price_range_d.replace(/ /, '');

    console.log({
        cityCode: cityCode,
        roomQuantity: roomQuantity,
        adults: adults,
        radius: radius,
        checkInDate: checkin_dat,
        checkOutDate: checkout_date,
        radiusUnit: 'KM',
        amenities: amenities,
        currency: currency,
        ratings: ratings,
        paymentPolicy: 'NONE',
        includeClosed: 'false',
        bestRateOnly: 'true',
        view: view,
        sort: sort,
        priceRange: price_range_d,
    });
    return new Promise(resolve => {
        if (ratings != '') {
            amadeus.shopping.hotelOffers.get({
                cityCode: cityCode,
                roomQuantity: roomQuantity,
                adults: adults,
                radius: radius,
                checkInDate: checkin_dat,
                checkOutDate: checkout_date,
                radiusUnit: 'KM',
                currency: currency,
                amenities: amenities,
                ratings: ratings,
                paymentPolicy: 'NONE',
                includeClosed: 'false',
                bestRateOnly: 'true',
                view: view,
                sort: sort,
                priceRange: price_range_d,
            }).then(function(response) {
                console.log('Success');
                let res_data = [{ status: true, search_data: response.data }];
                resolve(res_data)
            }).catch(function(error) {
                console.log('Have Error ');
                let res_data = [{ msg: 'No Data Found', status: false }];
                resolve(res_data);
            });
        } else {
            amadeus.shopping.hotelOffers.get({
                cityCode: cityCode,
                roomQuantity: roomQuantity,
                adults: adults,
                radius: radius,
                checkInDate: checkin_dat,
                checkOutDate: checkout_date,
                radiusUnit: 'KM',
                amenities: amenities,
                currency: currency,
                paymentPolicy: 'NONE',
                includeClosed: 'false',
                bestRateOnly: 'true',
                view: view,
                sort: sort,
                priceRange: price_range_d,
            }).then(function(response) {
                console.log('Success');
                let res_data = [{ status: true, search_data: response.data }];
                resolve(res_data)
            }).catch(function(error) {
                console.log('Have Error ');
                let res_data = [{ msg: 'No Data Found', status: false }]
                resolve(res_data);
            });
        }

    });

}

app.hotelOffersByHotel = async function(hotelId) {
    return new Promise(resolve => {
        amadeus.shopping.hotelOffersByHotel.get({
            hotelId: hotelId
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            console.log(error.result);
        });
    })
}
app.hotelOffersByHotel2 = async function(hotelId,offerId,checkInDate,checkOutDate,adults) {
    return new Promise(resolve => {
        amadeus.shopping.hotelOffersByHotel.get({
            hotelId: hotelId,
            offerId: offerId,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            adults     : adults
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            console.log(error.result);
        });
    })
}

app.get_hotel_details = async(city, checkin_date, checkout_date, adults, hotelId) => {
    // get_hotel_details
    return new Promise(resolve => {
        amadeus.shopping.hotelOffersByHotel.get({
            hotelId: hotelId,
            adults: adults,
            checkInDate: checkin_date,
            paymentPolicy: 'NONE',
            view: 'FULL_ALL_IMAGES',
            checkOutDate: checkout_date,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            console.log(error.result);
        });
    })
}



// app.get_offer_by_id = async (offer_id)=>{
//     return new Promise(resolve => {
//         amadeus.shopping.hotelOffer(offer_id).then(function(response){
//             resolve(response.data)
//         }).catch(function(error){
//             console.log(error.result);
//         });
//     })
// }

app.get_offer_by_id = async function(offer_id) {
    return new Promise(resolve => {
        amadeus.shopping.hotelOffer(offer_id).get().then(function(response) {
            let res = [{ res_of_data: response.data, status: true }];
            resolve(response.data);
        }).catch(function(error) {
            let res = [{ msg: 'No offer Found', status: false }];
            resolve(res);
        });
    })
}

module.exports = app