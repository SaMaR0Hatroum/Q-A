const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');


const checkUser =(req,res,next) => {
    const token = req.cookies.jwt;
        if(token){
        jwt.verify(token , 'Ask' , (err , decoded) => {
        if(err){
        res.locals.user = null;
        next()
        }
        if(decoded){
            User.findById(decoded.id)
            .then(user =>{
                const {userName, email ,id } = user;
                res.locals.user = {userName,email,id};
                next()
            })
            .catch(err =>{
                res.locals.user = null;
                next()
            })

            //  console.log(res.locals.user,'come frome dedeced')
        }

        }) 
    }else{
     res.locals.user = null;
      next()
    }
}

module.exports = {checkUser}