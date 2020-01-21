const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require('./routes'));
//adding a reference path for the stati folder unloads in app.js  
app.use("/uploads", express.static("uploads")); 

module.exports = app;