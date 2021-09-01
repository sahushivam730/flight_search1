module.exports = {
    hotel_booking: async(req, res) => {
        let data = await db.query("SELECT * FROM `hotel_bookings`", false, true);
        let page_title = 'Hotel-Booking';
        let bookings = await db.query("SELECT * FROM `hotel_bookings` INNER JOIN users ON users.code = hotel_bookings.user_code  order by hotel_bookings.created_at DESC",false,true)  
        console.log(bookings);
        res.render('../views/admin/hotel-booking', { "users": data, 'page_title': page_title ,"bookings":bookings})
    },
}