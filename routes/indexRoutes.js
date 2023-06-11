const express = require('express');

// Import notes routes
const newNotesRouter = require('./noteRoutes');

const app = express();

// Notice how all the routes for the groceries are /groceries.
// This is added to the previous /api route in the server.js file.
app.use('/notes', newNotesRouter);

module.exports = app;