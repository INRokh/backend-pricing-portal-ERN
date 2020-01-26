const jwt = require('../services/jwt')
const User = require('../database/models/user_model');

// Show all users
function index(req, res){
  User.find({is_active: true})
    .then(users => res.json(users))
    .catch(err => res.status(500).send(err))
}
// Generate JWT 
function login(req, res){
  res.json(
    {token: jwt.userToken(req.user)}
  );
}

// function logout(req, res){
//     req.user.logout();
// }

function register(req, res, next){
  const newUser = new User({username: req.body.username,
    email: req.body.email,
    is_admin: false,
    is_active: true
  });
  User.register(
    newUser,
    req.body.password,
    err => err ? next(err) : res.send('Ok')
  );
}

module.exports = {
  index,
  login,
  register
}