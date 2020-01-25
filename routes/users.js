const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

// Joi API: https://github.com/hapijs/joi/blob/v14.3.1/API.md

router.post('/', celebrate({
    body: { 
        name: Joi.string().name().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),

    }
}), UsersController.register);

router.post('/login', 
  passport.authenticate('local', { session : false }),
  UsersController.login
);

module.export = router;