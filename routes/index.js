const passport = require('passport');
const router = require('express').Router();

// Login is here, don't use jwt strategy.
router.use('/users', require('./users'));

router.use('/tags',
  passport.authenticate('jwt', { session : false }),
  require('./tags'));

  router.use('/images',
  //passport.authenticate('jwt', { session : false }),
  require('./images'));

router.use('/annotations', 
  passport.authenticate('jwt', { session : false }), 
  require('./annotations'));

module.exports = router;