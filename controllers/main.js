const { json } = require("body-parser");
const jwt = require('jsonwebtoken');
var date = require("date-and-time");
var ip = require('ip');
const striptags  = require('striptags');
module.exports = {
    home: async (req,res)=>{
      let data = await db.query("select * from airports",false)
      res.render('../views/main/home',{"session":req.session.DATA,"IATA":data})
    },
    flight: async (req,res)=>{
      var today = date.format(new Date(), 'YYYY-MM-DD');
      var verified_msg=req.flash("verified");
      var bookviatext = req.flash('bookviatext')
      res.render('../views/main/flight',{"session":req.session.DATA,"today":today,"verified_msg":verified_msg,"bookviatext":bookviatext,"tab":req.query.tab})
    },
    getflightsByDest : async (req,res)=>{
        try {
          let results = await Air.InspirationSearch(req.body.destination);
            if(results.length>0){
              res.send({"res":true,"data":results})
            }else{
              res.send({"res":false,"data":results})
            }
        } catch (error) {
          console.log(error);
        }
    },
    search_flights: async (req,res)=>{
      
      let params={}
      
      if(req.query.mobile==''){
        if(req.query.type=='oneway'){

          let from = await db.query("SELECT cityName,countryCode,code FROM `airports` WHERE `code`=:code",{"code":req.query.from},true)
          if(from.length>0){
            from = from[0].cityName+', '+from[0].countryCode+" ("+from[0].code+")"
          }else{
            from = ''
          }

          let to = await db.query("SELECT cityName,countryCode,code FROM `airports` WHERE `code`=:code",{"code":req.query.to},true)
          if(to.length>0){
            to = to[0].cityName+', '+to[0].countryCode+" ("+to[0].code+")"
          }else{
            to = ''
          }

          params = {
            'from' : req.query.from,
            'to' : req.query.to,
            'departdate' : req.query.departdate,
            'returndate' : req.query.returndate,
            'adults' : req.query.adults,
            'children' : req.query.children,
            'class' : req.query.class,
            'nonStop' : req.query.nonStop,
            'type' : req.query.type,
            'infants' : req.query.infants,
            'search': from+" To "+to
          }

          data = await Air.flightOffers(
            req.query.from,
            req.query.to,
            req.query.departdate,
            req.query.adults,
            req.query.children,
            req.query.infants,
            req.query.class,    
            req.query.nonStop
          );
        }
        if(req.query.type=='round'){
          let dates = req.query.daterange.split(' To ')
          departdate = dates[0]
          returndate = dates[1]
          data = await Air.flightOffers(
            req.query.from,
            req.query.to,
            departdate,
            req.query.adults,
            req.query.children,
            req.query.infants,
            req.query.class,    
            req.query.nonStop,
            returndate
          );

          let from = await db.query("SELECT cityName,countryCode,code FROM `airports` WHERE `code`=:code",{"code":req.query.from},true)
          if(from.length>0){
            from = from[0].cityName+', '+from[0].countryCode+" ("+from[0].code+")"
          }else{
            from = ''
          }
          
          let to = await db.query("SELECT cityName,countryCode,code FROM `airports` WHERE `code`=:code",{"code":req.query.to},true)
          if(to.length>0){
            to = to[0].cityName+', '+to[0].countryCode+" ("+to[0].code+")"
          }else{
            to = ''
          }

          params = {
            'from' : req.query.from,
            'to' : req.query.to,
            'departdate' : departdate,
            'returndate' : returndate,
            'adults' : req.query.adults,
            'children' : req.query.children,
            'class' : req.query.class,
            'nonStop' : req.query.nonStop,
            'type' : req.query.type,
            'infants' : req.query.infants,
            'search': from+" To "+to+", "+to+" To "+from
          }
        }
        if(req.query.type=='multicity'){
          data = await Air.flightOffersPost(
            req.query.from,
            req.query.to,
            req.query.departdate,
            req.query.adults,
            req.query.children,
            req.query.infants,
            req.query.class
          );

          let from = await db.query("SELECT cityName,countryCode,code FROM `airports` WHERE `code`=:code",{"code":req.query.from[0]},true)
          if(from.length>0){
            from = from[0].cityName+', '+from[0].countryCode+" ("+from[0].code+")"
          }else{
            from = ''
          }
          
          let to = await db.query("SELECT cityName,countryCode,code FROM `airports` WHERE `code`=:code",{"code":req.query.to[0]},true)
          if(to.length>0){
            to = to[0].cityName+', '+to[0].countryCode+" ("+to[0].code+")"
          }else{
            to = ''
          }

          let from1 = await db.query("SELECT cityName,countryCode,code FROM `airports` WHERE `code`=:code",{"code":req.query.from[1]},true)
          if(from1.length>0){
            from1 = from1[0].cityName+', '+from1[0].countryCode+" ("+from1[0].code+")"
          }else{
            from1 = ''
          }
          
          let to1 = await db.query("SELECT cityName,countryCode,code FROM `airports` WHERE `code`=:code",{"code":req.query.to[1]},true)
          if(to1.length>0){
            to1 = to1[0].cityName+', '+to1[0].countryCode+" ("+to1[0].code+")"
          }else{
            to1 = ''
          }

          params = {
            'from' : req.query.from,
            'to' : req.query.to,
            'departdate' : req.query.departdate,
            'returndate' : req.query.returndate,
            'adults' : req.query.adults,
            'children' : req.query.children,
            'class' : req.query.class,
            'nonStop' : req.query.nonStop,
            'type' : req.query.type,
            'infants' : req.query.infants,
            'search': from+" To "+to+", "+from1+" To "+to1
          }
        }
      
        var today = date.format(new Date(), 'YYYY-MM-DD');
        let val = await db.query("SELECT air FROM `markup_fair` where id=1",false,true)  
        let air_markup_fair=val[0].air
        // console.log(data);
        // res.json({
        //   data: data
        // })
        res.render('../views/main/flight-search',{"session":req.session.DATA,"data":data,"today":today,"moment":moment,"params":params,"air_markup_fair":air_markup_fair})
      }else{
        var datetime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        var id = 0
        if(typeof req.session.DATA != 'undefined'){
          var id = req.session.DATA[0].id
        }
      
        let save = db.insert('bookviatext',{
                      "ip_address" : ip.address(),
                      "id" : id,
                      "from1" : req.query.from,
                      "to1" : req.query.to,
                      "date" : req.query.departdate,
                      "adult" : req.query.adults,
                      "child" : req.query.children,
                      "infants" : req.query.infants,
                      "class" : req.query.class,
                      "nonstop" : req.query.nonStop,
                      "code" : req.query.code,
                      "mobile" : req.query.mobile,
                      "datetime" : datetime
                  })
        var tab = 1
        if(req.query.type=='round'){
          tab = 2
        }
        if(req.query.type=='multicity'){
          tab = 3
        }
        req.flash('bookviatext','request saved successfully, we will contact you soon.')
        res.redirect(base_url+'flight?tab='+tab)
      }
    },
    flight_search2: async (req,res)=>{
     
        let data = await Air.flightOffers(
          req.body.from,
          req.body.to,
          req.body.departdate,
          req.body.returndate,
          req.body.adults,
          req.body.children,
          req.body.class,
          req.body.nonStop
        );
        
        
        res.send({"res":true,"data":data})
    },
    searchIATA: async (req,res)=>{
      try {
        let results = await db.query("SELECT *  FROM `airports` WHERE `cityName` LIKE :cityName",{"cityName":'%'+req.body.keyword+'%'})
        if(results.length>0){
          res.send({"res":true,"data":results})
        }else{
          res.send({"res":false,"data":results})
        }
      } catch (error) {
        console.log(error);
      }
    },
    travelerInfo: async (req,res)=>{
      try {
        let card = await db.query('SELECT * FROM `saved_cards` WHERE user_code = :user_code',{
          "user_code" : req.session.DATA[0].code,
        },true);

        let ContactInfo = await db.query("SELECT * FROM `contact_info` where id=:id",{"id":req.session.DATA[0].id},true) 

        let val = await db.query("SELECT air FROM `markup_fair` where id=1",false,true)  
        let air_markup_fair=val[0].air
        var now = new Date();
        var dddd = date.addDays(now, -730);
        res.render('../views/main/travelerInfo',{"session":req.session.DATA,"flight_offer_id":req.params.id,"trv_count":req.params.trv,"card":card,"air_markup_fair":air_markup_fair,"date":date.format(dddd, 'YYYY-MM-DD'),"ContactInfo":ContactInfo})
      } catch (error) {
        console.log(error);
      }
    },
    savetravelers: async (req,res)=>{
      try {
        var datetime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        let travelers_ids = []
        for(let i=0;i<req.params.trv;i++){
          let wheelchair = 'no'
          if(req.body.wheelchair!=undefined){
            if(striptags(req.body.wheelchair[i])=='yes'){
              wheelchair = 'yes'
            }
          }
          let results = await db.insert('travellers',{
            "user_code" : req.session.DATA[0].code,
            "f_name" : striptags(req.body.firstname[i]),
            "l_name" : striptags(req.body.lastname[i]),
            "dob" : striptags(req.body.dob[i]),
            "nationality" : striptags(req.body.nationality[i]),
            "ppno" : striptags(req.body.passport_number[i]),
            "ppexp" : striptags(req.body.passportExp[i]),
            "ppicountry" : striptags(req.body.passportIssCountry[i]),
            "ktrvno" : striptags(req.body.otherNo[i]),
            "address" : striptags(req.body.address[i]),
            "flyerno" : striptags(req.body.flyerNo[i]), 
            "wheelchair" : wheelchair, 
            "datetime" : datetime
          });  
         
          travelers_ids.push(results.insertId)
        }
        let checkContactinfo = await db.query("SELECT * FROM `contact_info` where id=:id",{"id":req.session.DATA[0].id},true) 
        if(checkContactinfo.length>0){ 
          let updateContactInfo = await db.query('update contact_info set f_name=:f_name , l_name=:l_name , email=:email , code=:code , mobile=:mobile , address=:address , city=:city , state=:state , zip=:zip , country=:country where id=:id',{
            "id" : req.session.DATA[0].id,
            "f_name" : striptags(req.body.firstname[0]),
            "l_name" : striptags(req.body.lastname[0]),
            "email" : striptags(req.body.email),
            "code" : striptags(req.body.countryCode),
            "mobile" : striptags(req.body.mobile),
            "address" : striptags(req.body.address2),
            "city" : striptags(req.body.city),
            "state" : striptags(req.body.state),
            "zip" : striptags(req.body.zip),
            "country" : striptags(req.body.country),
            "datetime" : datetime
          });  
        }else{
          let savecontactinfo = await db.insert('contact_info',{
            "id" : req.session.DATA[0].id,
            "f_name" : striptags(req.body.firstname[0]),
            "l_name" : striptags(req.body.lastname[0]),
            "email" : striptags(req.body.email),
            "code" : striptags(req.body.countryCode),
            "mobile" : striptags(req.body.mobile),
            "address" : striptags(req.body.address2),
            "city" : striptags(req.body.city),
            "state" : striptags(req.body.state),
            "zip" : striptags(req.body.zip),
            "country" : striptags(req.body.country),
            "datetime" : datetime
          }); 
        }
        travelers_ids = travelers_ids.join(',')
        let results2 = await db.query('insert into bookings set user_code = :user_code , flight_offer_id = :flight_offer_id , flight_blob = :flight_blob , travellers = :travellers , status = :status , datetime = :datetime',{
          "user_code" : req.session.DATA[0].code,
          "flight_offer_id" : req.params.id,
          "flight_blob" : striptags(JSON.stringify(bigb)),
          "travellers" : travelers_ids,
          "status" : 0,
          "datetime" : datetime,
          "ip_address": ip.address()
        });
       
        travelers_ids= travelers_ids.split(',')
        let results1 = await db.query('update travellers set booking_id = :booking_id where id IN('+travelers_ids+')',{
          "ids" : travelers_ids.toString(),
          "booking_id" : results2.insertId
        });
      
        if(results2.insertId!=null){
          let vermail=''
          if(req.session.DATA[0].type=='guest'){
            vermail = striptags(req.body.email[0])
          }else{
            vermail = req.session.DATA[0].email
          }
          var message = "Thank you for using Monder. Your tickets will be confirmed within next 2 hours. You will get notified of the Ticket details in your email. Stay tuned!"
          fun.nodemailer(vermail,"Booking Confirmed",message)
        }

        var datetime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        var chk = await db.query('select sno from saved_cards where user_code=:user_code',{"user_code":req.session.DATA[0].code},true,false)
        if(chk.length>0){
            let savecard = await db.query('update saved_cards set name=:name,number=:number,type=:type,expiry_date=:expiry_date,cvv=:cvv,datetime=:datetime where user_code=:user_code',{
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

        res.redirect(base_url+'success')
      } catch (error) {
        console.log(error);
      }
    },
    payment: async (req,res)=>{
      try {
        let card = await db.query('SELECT * FROM `saved_cards` WHERE user_code = :user_code',{
          "user_code" : req.session.DATA[0].code,
        },true);
        let val = await db.query("SELECT air FROM `markup_fair` where id=1",false,true)  
        let air_markup_fair=val[0].air
       
        res.render('../views/main/payment',{"session":req.session.DATA,"flight_offer_id":req.params.id,"trv_count":req.params.trv,"card":card,"air_markup_fair":air_markup_fair})
      } catch (error) {
        console.log(error);
      }
    },
    savepaymentdetails: async (req,res)=>{
      try {
        var datetime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        var chk = await db.query('select sno from saved_cards where user_code=:user_code',{"user_code":req.session.DATA[0].code},true,false)
        if(chk.length>0){
            let savecard = await db.query('update saved_cards set name=:name,number=:number,type=:type,expiry_date=:expiry_date,cvv=:cvv,datetime=:datetime where user_code=:user_code',{
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

        

        res.redirect(base_url+'success')
      } catch (error) {
        console.log(error);
      }
    },
    saveFlight: async (req,res)=>{
      try {
        bigb = []
        bigb.push(req.body)
     
        if(bigb.length>0){
          res.send({'res':true})
        }else{
          res.send({'res':false})
        }
      } catch (error) {
        console.log(error);
      }
    },
    success: async (req,res)=>{
      try {
        let val = await db.query("SELECT air FROM `markup_fair` where id=1",false,true)  
        let air_markup_fair=val[0].air
        let code = await db.query("SELECT booking_id FROM `bookings` WHERE user_code = :user_code ORDER BY booking_id DESC LIMIT 1",{"user_code":req.session.DATA[0].code},true)
        let travellers = await db.query("SELECT * FROM `travellers` WHERE booking_id = :code",{"code":code[0].booking_id},true)
        let contactInfo = await db.query("SELECT * FROM `contact_info` where id=:id",{"id":req.session.DATA[0].id},true) 
        res.render('../views/main/success',{"session":req.session.DATA,"flight_offer_id":req.params.id,"trv_count":req.params.trv,"air_markup_fair":air_markup_fair,"travellers":travellers,"contactInfo":contactInfo})
      } catch (error) {
        console.log(error);
      }
    },
    bookcar: async (req,res)=>{
      try {
        var datetime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        let results = await db.insert('car_rental_booking',{
          "firstname"  : striptags(req.body.fname),
          "lastname"   : striptags(req.body.lname),
          "email"      : striptags(req.body.email),
          "mobile "    : striptags(req.body.mobile),
          "pickupdate" : striptags(req.body.pdate),
          "pickuptime" : striptags(req.body.ptime),
          "returndate" : striptags(req.body.rdate),
          "returntime" : striptags(req.body.rtime),
          "datetime" : datetime
        });  
        // var message = "Thank you for using Monder. Your Rental car will be confirmed within next 2 hours. You will get notified of the Ticket details in your email. Stay tuned!"
        // fun.nodemailer(striptags(req.body.email),"Booking Confirmed",message)
        res.send({'res':true,'msg':'booking successfull, wait for confirmation.'})

      } catch (error) {
        console.log(error);
      }
    },
    booking_details: async (req,res)=>{
      try {
        let arr = req.params.id.split('-')
        let booking_id = arr[arr.length-1]
        let data = await db.query("SELECT * FROM `bookings` INNER JOIN users ON users.code = bookings.user_code where booking_id=:booking_id AND user_code=:user_code order by datetime DESC",{"booking_id":booking_id,"user_code":req.session.DATA[0].code},true) 
        let data2 = await db.query("SELECT * FROM `travellers` where booking_id=:booking_id",{"booking_id":booking_id},true) 
        let contactInfo = await db.query("SELECT * FROM `contact_info` where id=:id",{"id":req.session.DATA[0].id},true) 
        res.render('../views/main/booking-details',{"session":req.session.DATA,"data":data,"travellers":data2,"contactInfo":contactInfo})
      } catch (error) {
        console.log(error);
      }
    },
    contact: async (req,res)=>{
      try {
        res.render('../views/main/contact',{"session":req.session.DATA})
      } catch (error) {
        console.log(error);
      }
    },
    savecontact: async (req,res)=>{
      try {
        var datetime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
          let save = await db.insert('contactus',{
            "name" : striptags(req.body.name),
            "email" : striptags(req.body.email),
            "subject" : striptags(req.body.subject),
            "message" : striptags(req.body.message),
            "datetime" : datetime
          });  
          res.send({'res':true,"msg":"Thank you, we are getting in touch! "})
      } catch (error) {
        console.log(error);
      }
    },
    elite: async (req,res)=>{
      var today = date.format(new Date(), 'YYYY-MM-DD');
      var verified_msg=req.flash("verified");
      var bookviatext = req.flash('bookviatext')
      res.render('../views/main/elite',{"session":req.session.DATA,"today":today,"verified_msg":verified_msg,"bookviatext":bookviatext,"tab":req.query.tab})
    },
    about: async (req,res)=>{
      try {
        res.render('../views/main/about',{"session":req.session.DATA})
      } catch (error) {
        console.log(error);
      }
    },
    faq: async (req,res)=>{
      try {
        res.render('../views/main/faq',{"session":req.session.DATA})
      } catch (error) {
        console.log(error);
      }
    },
    terms_cond: async (req,res)=>{
      try {
        res.render('../views/main/terms-cond',{"session":req.session.DATA})
      } catch (error) {
        console.log(error);
      }
    }
}