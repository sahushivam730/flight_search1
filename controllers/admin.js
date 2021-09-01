var date = require("date-and-time");
module.exports = {
    login: async (req,res)=>{
      res.render('../views/admin/login')
    },
    logout: async (req,res)=>{
        try {
            req.session.destroy();
            console.log("logout successfull!");
            res.redirect(base_url+"admin/login")
        } catch (error) {
            console.log(error);
        }
    },
    loginPost: async (req,res)=>{
        try {
            let data = await db.query("select * from master81889 where email=:email",{"email":req.body.l_email},true)         
            if(data){
                if(data[0].password==req.body.l_password){
                    data.push({"usertype":'admin'})
                    req.session.DATA = data
                    res.send({
                        status:true,
                        msg:'logged In'
                    });
                }else{
                    res.send({
                        status:false,
                        msg:'invalid Username Or Password'
                    });
                }
            }else{
                res.send({
                    status:false,
                    msg:'Email is not registered'
                });
            }
        } catch (error) {
            console.log(error);
            res.send({
                status:false,
                msg:'Something Went Wrong Please Try Again'
            });

        }
    },
    dashboard: async (req,res)=>{
        let totday  = date.format(new Date(), 'YYYY-MM-DD');
        let totusers = await db.query("SELECT COUNT(*) as tot FROM `users` WHERE status=1 ",false,true)  
        let totdays_tot = await db.query("SELECT COUNT(*) as tot FROM `users` WHERE status=1 AND created_at LIKE '%"+totday+"%';",false,true)  

        let totairbookings = await db.query("SELECT COUNT(*) as tot FROM `bookings`",false,true)  
        let todaysairbookings = await db.query("SELECT COUNT(*) as tot FROM `bookings` WHERE datetime LIKE '%"+totday+"%';",false,true)  

        let tothotelbookings = await db.query("SELECT COUNT(*) as tot FROM `hotel_bookings`",false,true)  
        let todayshotelbookings = await db.query("SELECT COUNT(*) as tot FROM `hotel_bookings` WHERE created_at LIKE '%"+totday+"%';",false,true)  

        let totcarbookings = await db.query("SELECT COUNT(*) as tot FROM `car_rental_booking`",false,true)  
        let todayscarbookings = await db.query("SELECT COUNT(*) as tot FROM `car_rental_booking` WHERE datetime LIKE '%"+totday+"%';",false,true)  
        
        res.render('../views/admin/dashboard',{'totusers':totusers[0].tot,"todays_tot":totdays_tot[0].tot,"totairbookings":totairbookings[0].tot,"todaysairbookings":todaysairbookings[0].tot,"tothotelbookings":tothotelbookings[0].tot,"todayshotelbookings":todayshotelbookings[0].tot,"totcarbookings":totcarbookings[0].tot,"todayscarbookings":todayscarbookings[0].tot})
    },
    users: async (req,res)=>{
        let data = await db.query("SELECT * FROM `users`",false,true)  
        res.render('../views/admin/users',{"users":data})
    },
    carddetails: async (req,res)=>{
        let data = await db.query("SELECT * FROM `saved_cards` where user_code=:user_code",{"user_code":req.params.code},true)  

        res.render('../views/admin/carddetails',{"card":data})
    },
    air_booking: async (req,res)=>{
        let data = await db.query("SELECT * FROM `bookings` INNER JOIN users ON users.code = bookings.user_code  order by datetime DESC",false,true)  
        res.render('../views/admin/air-bookings',{"bookings":data})
    },
    air_booking_details: async (req,res)=>{
        let arr = req.params.id.split('-')
        let booking_id = arr[arr.length-1]
        let data = await db.query("SELECT * FROM `bookings` INNER JOIN users ON users.code = bookings.user_code where booking_id=:booking_id  order by datetime DESC",{"booking_id":booking_id},true) 
        let data2 = await db.query("SELECT * FROM `travellers` where booking_id=:booking_id",{"booking_id":booking_id},true) 
        let userid = data[0].user_code.split('L')
        userid = userid[1]
        let contact_info = await db.query("SELECT * FROM `contact_info` where id=:id",{"id":userid},true) 
        res.render('../views/admin/air-bookings-details',{"data":data,"travellers":data2,"booking_id":booking_id,"contact_info":contact_info})
    },
    hotel_booking: async (req,res)=>{
        let data = await db.query("SELECT * FROM `hotel_bookings` INNER JOIN users ON users.id = hotel_bookings.user_id  order by hotel_bookings.created_at DESC",false,true)  
        console.log(data);
        res.render('../views/admin/hotel-bookings',{"bookings":data})
    },
    set_markup_fair: async (req,res)=>{
        let data = await db.query("SELECT * FROM `markup_fair` where id=1",false,true)  
        let msg = req.flash('success')
        res.render('../views/admin/set-markup-fair',{"fairs":data,"msg":msg})
    },
    set_markup_fair_update: async (req,res)=>{
        let now=new Date();
        let datetime=moment(now).format('Y-M-D H:mm:s')
        db.query('update markup_fair set air=:air,hotel=:hotel,update_datetime=:datetime where id=1',{"air":req.body.val1,"hotel":req.body.val2,"datetime":datetime},true)
        req.flash('success','updated successfully')
        res.redirect(base_url+'admin/set-markup-fair')
    },
    carBookings: async (req,res)=>{
        let data = await db.query("SELECT * FROM `car_rental_booking` ORDER BY booking_id DESC",false,true)  
        res.render('../views/admin/car-bookings',{"bookings":data})
    },
    air_billing: async (req,res)=>{
        let arr = req.params.id.split('-')
        let booking_id = arr[arr.length-1]
        let data = await db.query("SELECT * FROM `bookings` WHERE booking_id=:booking_id",{"booking_id":booking_id},true)
        let travellers = await db.query("SELECT * FROM `travellers` where booking_id=:booking_id",{"booking_id":booking_id},true)   
        let blob = JSON.parse(data[0].flight_blob)
        let search = blob[0].search
        search = search.split('To')
        travellers = travellers.length
        var today = date.format(new Date(), 'DD-MM-YYYY');
        let markup_fair = await db.query("SELECT * FROM `markup_fair` where id=1",false,true)  
        let price = (parseFloat(blob[0].price.grandTotal) + (blob[0].price.grandTotal*markup_fair[0].air)/100)
        price = price.toFixed(2)
        res.render('../views/admin/air-billing',{"data":data,"today":today,"blob":blob,"search":search,"travellers":travellers,"price":price})
    },
    hotel_booking_details: async (req,res)=>{
        res.render('../views/admin/hotel-bookings-details',{"data":data,"travellers":data2,"booking_id":booking_id})
    },
}