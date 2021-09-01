var Amadeus = require('amadeus');
// initializing Amadeus //
var amadeus = new Amadeus({
    clientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    clientSecret: 'xxxxxxxxxxxxx'
  });
  

let app ={}

app.InspirationSearch= async function (origin) {
    return new Promise(resolve => {
        amadeus.shopping.flightDestinations.get({
            origin : origin
        }).then(function(response){
            resolve(response.data)
        }).catch(function(error){
            console.log(error.result);
        });
    })
}

app.flightAvailabilities= async function (body) {
    return new Promise(resolve => {
        amadeus.shopping.availability.flightAvailabilities.post(JSON.stringify(body)).then(function(response){
            resolve(response.result)
        }).catch(function(error){
            console.log(error);
        });
    })
}

app.flightOffers= async function (origin,destination,departdate,adults,children,infants,travelClass,nonstop,returnDate) {
    return new Promise(resolve => {
        amadeus.shopping.flightOffersSearch.get({
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: departdate,
            adults: adults,
            children: children,
            infants: infants,
            travelClass: travelClass,
            nonStop: nonstop,
            returnDate: returnDate,
            currencyCode: 'USD'
            // maxPrice : '15000'

          }).then(function(response){
            resolve(response.result)
        }).catch(function(error){
            console.log(error);
            let result = { meta: { count: 0 }, data: [] }
            resolve(result)
        });
       
    })
}

app.flightOffersPost= async function (origin,destination,departdate,adults,children,infants,travelClass) {
    return new Promise(resolve => {
        let bodyData={
            "currencyCode": "USD",
            "sources": [
              "GDS"
            ],
            "searchCriteria": {
                "flightFilters": {
                  "cabinRestrictions": [
                    {
                      "cabin": travelClass,
                      "coverage": "MOST_SEGMENTS",
                      "originDestinationIds": [
                        "1"
                      ]
                    }
                  ]
                }
              },
              "originDestinations":[],
              "travelers":[]
        }
        let id = 1;
        for(let i=0;i<origin.length;i++){
            bodyData['originDestinations'].push({
                "id": id,
                "originLocationCode": origin[i],
                "destinationLocationCode": destination[i],
                "departureDateTimeRange": {
                  "date": departdate[i]
                }
            })
            id++
        }
        let j=1
        for(j;j<=adults;j++){
            bodyData['travelers'].push({
                "id": j,
                "travelerType": "ADULT"
            })
        }
        let f=j
        for(f;f<=children;f++){
            bodyData['travelers'].push({
                "id": f,
                "travelerType": "CHILD"
            })
        }
        let c=f
        for(c;c<=infants;c++){
            bodyData['travelers'].push({
                "id": c,
                "travelerType": "INFANT"
            })
        }

        amadeus.shopping.flightOffersSearch.post(JSON.stringify(bodyData)).then(function(response){
            resolve(response.result)
            console.log(response.result);
        }).catch(function(error){
            console.log(error);
            let result = { meta: { count: 0 }, data: [] }
            resolve(result)
        });
       
    })
}

app.createFlightOrder = async function (flightOffers,travelers) {
    return new Promise(resolve => {
        amadeus.booking.flightOrders.post(
            JSON.stringify({
                'type': 'flight-order',
                'flightOffers': flightOffers,
                'travelers': travelers
            })
        ).then(function(response){
            resolve(response.result)
        }).catch(function(error){
            console.log(error);
        });
       
    })
}

module.exports = app
