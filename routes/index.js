const passport = require('passport');
const router = require('express').Router();

router.use('/tags', require('./tags'));
router.use('/images', require('./images'));
router.use('/users', require('./users'));
router.use('/annotations', 
  passport.authenticate('jwt', { session : false }), 
  require('./annotations')
)

module.exports = router;