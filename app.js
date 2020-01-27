const express = require('express');
const app = express();

const cors = require("cors");
const morgan = require("morgan");
const passport = require('passport');


require('./config/aws');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("combined")); //combined: Standard Apache combined log output.
app.use(require("./routes"));


require('./config/passport');
app.use(passport.initialize());

app.use(require('./routes'));

module.exports = app;