const striptags  = require('striptags');
var date = require("date-and-time");
const jwt = require("jsonwebtoken");
var ip = require('ip');
module.exports = {
    login: async (req,res)=>{
        try {
            if(req.body.utype=='guest'){
                let data = await db.query("select * from users where ip_address=:ip_address",{"ip_address":ip.address()},false,false)  
                if(data.length>0){
                    data.push({"status":1})
                    req.session.DATA =  data
                     
                    res.send({
                        status:true,
                        msg:'logged In'
                    });
                }else{
                    let created_at  = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
                    var user = ip.address()+"_"+created_at;
                    var token = jwt.sign({user}, '7127C9FDEAEFB4657868F86GGH8HG2');
                   
                    let results = await db.insert('users',{
                        "token"      : token,
                        "type"       : 'guest',
                        "status"     : 1,
                        "ip_address" : ip.address(),
                        "created_at" : created_at
                    });
                    let result = await db.query('update users set code=:code where id=:id',{
                        "id" : results.insertId,
                        "code" : 'FL'+results.insertId,
                      }); 
                    let data = await db.query("select * from users where id=:id",{"id":results.insertId},false,false)            
                    data.push({"status":1})
                    req.session.DATA =  data
                     
                    res.send({
                        status:true,
                        msg:'logged In'
                    });
                }
                
            }else{
                let data = await db.query("select * from users where email=:email",{"email":req.body.l_email},false,false)            
                if(data.length>0){

                    if(data[0].status != 1){
                        //send mail for verification
                        var user = req.body.l_email+"_"+data[0].username
                        var token = jwt.sign({user}, '7127C9FDEAEFB4657868F86GGH8HG2');
                        fun.nodemailer(req.body.l_email,"Verify Account",base_url+"verify?token="+token)
                        res.send({"res":false,"msg":"Email is not verified, We've sent you the verification link again, please verify with this email first."});
                        return;
                    }

                    let plain_pwd = req.body.l_password
                    let hash_pwd = data[0].pwd
                    fun.comparePassword(plain_pwd,hash_pwd,function(err,isMathch){
                        if(isMathch == true){
                            data.push({"status":1})
                            req.session.DATA = data
                            console.log(req.session.DATA);
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
                    })
                }else{
                    res.send({
                        status:false,
                        msg:'Email is not registered'
                    });
                }
            }
        } catch (error) {
            res.send({
                status:false,
                msg:'Something Went Wrong Please Try Again'
            });

        }
    },
    signup: async (req,res)=>{
        try {
            let data = await db.query("select * from users where email=:email",{"email":req.body.email},false,false)            
            console.log(data);
            if(data.length>0){
                    res.send({
                        status:false,
                        msg:'Email is already registered.'
                    });
            }else{
                let pwd   = req.body.password
                let email = striptags(req.body.email)
                let username  = striptags(req.body.username)
                let created_at  = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
                fun.cryptPassword(pwd,async function(err,hash){
                    let results = await db.insert('users',{
                        "username"   : username,
                        "email"      : email,
                        "pwd"        : hash,
                        "type"       : 'user',
                        "created_at" : created_at
                      });  
                     
                    
                        //send mail for verification
                        var user = email+"_"+username
                        var token = jwt.sign({user}, '7127C9FDEAEFB4657868F86GGH8HG2');
                        fun.nodemailer(email,"Verify Account",base_url+"verify?token="+token);
                        res.send({
                            status:true,
                            msg:"We've sent you an email with the confirmation, please verify your email to complete the sign up process."
                        });
                        let result = await db.query('update users set code=:code where id=:id',{
                            "id" : results.insertId,
                            "code" : 'FL'+results.insertId,
                          });  
                   
                })
            }
        } catch (error) {
            res.send({
                status:false,
                msg:'Something Went Wrong Please Try Again'
            });

        }
    },
    logout: async (req,res)=>{
        try {
            req.session.destroy();
            console.log("logout successfull!");
            res.redirect(base_url)
        } catch (error) {
            console.log(error);
        }
    },
    myaccount: async (req,res)=>{
        try {
            let bookings = await db.query("SELECT * FROM `bookings` WHERE user_code = :user_code",{"user_code":req.session.DATA[0].code},true,false)            
            let hotelbookings = await db.query("SELECT *,(select cityName from airports where code=hotel_bookings.booking_city LIMIT 1) as city FROM `hotel_bookings` WHERE user_code = :user_code",{"user_code":req.session.DATA[0].code},true,false)            
            if(req.query.tb==null){
                req.query.tb=1
            }
            res.render('../views/main/myacc',{"session":req.session.DATA,"bookings":bookings,"tb":req.query.tb,"hotelbookings":hotelbookings})
        } catch (error) {
            console.log(error);
        }
    },
    changePassword: async (req,res)=> {
      try {
            confirmPwd = await db.query("select pwd from users where id=:id",{"id":req.session.DATA[0].id},true,false)
            let hash_pwd = confirmPwd[0].pwd  
            let plain_pwd = req.body.oldpwd
            fun.comparePassword(plain_pwd,hash_pwd,function(err,isMathch){
                if(isMathch == true){
                    let pwd = req.body.cnewpwd
                    fun.cryptPassword(pwd,function(err,hash){
                        db.query("update users set pwd=:pwd where id=:id",{"pwd":hash,"id":req.session.DATA[0].id},true,false)
                        res.send({"status":true,"msg":"Password has been Updated."}) 
                    })
                }else{
                    res.send({"status":false,"msg":"Old Password Invalid."}) 
                }
            })
      } catch (error) {
          console.log(error);
      }
    },
    verify: async (req,res)=> {
        try {
            if(req.query.token){
                jwt.verify(req.query.token, '7127C9FDEAEFB4657868F86GGH8HG2',async function(err, token_data,) {
                    if (err) {
                        req.flash("verified","Link expired.")
                        res.redirect(base_url)
                    } else {
                        var user = token_data.user.split("_")  
                        var email = user[0]
                        db.query("update users set status=1 where email=:email",{"email":email},true,false)
                        let data = await db.query("select * from users where email=:email",{"email":email},true,false)            
                        data.push({"status":1})
                        req.session.DATA = data
                        req.flash("verified","Your email is verified.")
                        res.redirect(base_url)
                    }
                })  
            }else{
                req.flash("verified","Link expired.")
                res.redirect(base_url)
            }
        } catch (error) {
            console.log(error);
        }
    },
    forgotpassword: async (req,res)=>{
        try {
            let data = await db.query("select email,username from users where email=:email",{"email":req.body.email},false,false) 
            if(data.length>0){
                //send mail for verification            
                var pwd           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                var length = 8
                for ( var i = 0; i < length; i++ ) {
                    pwd += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                fun.nodemailer(req.body.email,"Forget Password",pwd)
                    fun.cryptPassword(pwd,function(err,hash){
                        db.query("update users set pwd=:pwd where email=:email",{"pwd":hash,"email":req.body.email},true,false)
                    })
                res.send({"res":true,"msg":"We've sent default password on your given email address, please check."})
            }else{
                res.send({"res":false,"msg":"Email not registered."});
            }
        } catch (error) {
            console.log(error);
        }
    }
}