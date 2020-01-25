const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

// Joi API: https://github.com/hapijs/joi/blob/v14.3.1/API.md

// Get list of all users 
router.get('./',
  passport.authenticate('jwt', { session : false }),
  UsersController.index
);

// Create a new user
router.post('/', celebrate({
  body: { 
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
  }
  }), 
  UsersController.register);

// Get jwt token using passport-local-mongoose strategy 
router.post('/login', celebrate({
  body: {
    username: Joi.string().required(),
    password: Joi.string().required()
  }
  }),
  passport.authenticate('local', { session : false }),
  UsersController.login
);

module.export = router;