const express = require('express');
const app = express();
const patientRoutes = require('./routes/patientRoutes');
app.use(express.json());
app.use(patientRoutes);
module.exports = app;