const passport = require('passport');
const User = require('../database/models/user_model');

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const LocalStrategy = require('passport-local');
passport.use(new LocalStrategy(User.authenticate()));

const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const jwt = require('../services/jwt');
passport.use(new JwtStrategy(
  {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
  },
  jwt.tokenToUser
));