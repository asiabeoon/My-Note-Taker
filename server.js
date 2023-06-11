// copied Tom's template from the Tom's review server.js file adjusted as needed.
const express = require('express');
const path = require('path');

//  routes defaults to the index.js in that folder
const api = require('./routes/indexRoutes');

// process.env.PORT must be used for Heroku connections
const PORT = process.env.PORT || 4091;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// all my routes will start with /api, and then we look in the routes/index.js file from there.
app.use('/api', api);

// serve the public folder to the user
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// start the server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
