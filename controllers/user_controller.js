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
    {token: jwt.userToToken(req.user)}
  );
}

function register(req, res, next){
  const newUser = new User({username: req.body.username,
    email: req.body.email,
    is_admin: false,
    is_active: true
  });
  User.register(
    newUser,
    req.body.password,
    err => err ? res.status(500).send(err) : res.send('Ok')
  );
}

function userInfo(req, res, next){
  res.json({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    is_active: req.user.is_active,
    is_admin: req.user.is_admin
  });
}

async function update(req, res) {
  let updatedUsers = []
  for(let u of req.body.updateAdmin){
    let user = await User.findByIdAndUpdate(u)
      .catch(err => res.status(500).send(err));
    if(!user){
      return;
    }
    user.is_admin = true;
    await user.save()
      .catch(err => res.status(500).send(err));
    updatedUsers.push(user)
    }
    res.json(updatedUsers)
}

module.exports = {
  index,
  login,
  register,
  userInfo,
  update
}