const {User} = require('../models/user');

let auth = (req,res,next) => {
    let token = req.cookies.auth;
    User.verifyToken(token, (err,user) => {
        if(err) res.json({error: true});
        if(!user) return res.json({error: true});
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = {auth};