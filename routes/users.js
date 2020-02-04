const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const UserController = require('../controllers/user_controller');
const passport = require('passport');

// Joi API: https://github.com/hapijs/joi/blob/v14.3.1/API.md

// Get list of all users 
router.get('/',
  passport.authenticate('jwt', { session : false }),
  UserController.index
);

// Create a new user
router.post('/', celebrate({
  body: { 
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
  }
  }), 
  UserController.register
);

// Get jwt token using passport-local-mongoose strategy 
router.post('/login', celebrate({
  body: {
    username: Joi.string().required(),
    password: Joi.string().required()
  }
  }),
  passport.authenticate('local', { session : false }),
  UserController.login
);

router.get('/me',
  passport.authenticate('jwt', { session : false }),
  UserController.userInfo 
);

router.put(
    '/',
    celebrate({
        body: { 
          updateAdmin: Joi.array().items(Joi.string().required()).required()
        }
    }),
    UserController.update
);

module.exports = router;