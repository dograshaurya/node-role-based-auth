const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./v1/config/db');
const logger = require('./v1/utils/logger');
const indexRoutes = require("./v1/routes/indexRoutes");
const path = require("path");
dotenv.config();


const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(logger);


// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/v1", indexRoutes);


module.exports = app;
