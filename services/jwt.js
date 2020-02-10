const JWT = require('jsonwebtoken');
const User = require('../database/models/user_model');


function userToToken(user){
  return JWT.sign(
    {user_id: user.id},
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_TTL}
  );
}

function tokenToUser(jwt, done){
  User.findById(jwt.user_id)
    // TIP: the following `user ? user : false` could also be
    // written as `user || false`. This way is a bit more compact and
    // you dont need to repeat the variable name.
    // BREAKDOWN: left || right
    // if left expression is truthy use it, else use right.
    .then(user => done(null, user ? user : false))
    .catch(err => done(err));
}

module.exports = {
  userToToken, 
  tokenToUser
}