const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/constant');
const userService = require('../services/userService');

module.exports.checkToken =  async function(req, res, next) {
    if (req.headers.token != 'undefined') {
        const token = req.headers.token;  
        const data = await jwt.verify(token,jwtSecret);
        const user = await userService.findUser(data);
        if (user===null) return res.json({ message:'Failed to check'});
        res.locals.user = user;
        return next();  
    }
    return res.json({ message:'Failed to check'});
};
  