const express = require('express');
const app = express();

const cors = require("cors");
const passport = require('passport');

require('./config/aws');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require('./config/passport');
app.use(passport.initialize());

app.use(require('./routes'));

module.exports = app;