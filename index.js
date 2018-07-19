const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./server/routes');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
// use this instead if MongoDB access control is not enabled
// mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

mongoose.connection
    .on('error', error => console.log('Error connecting to MongoDB:', error))
    .once('open', () => console.log('Connected to MongoDB.'))

const app = express();

app.use(bodyParser.json({limit: '16mb'})); // increased to accommodate 1000 points/batch
app.use(cors());

app.use('/', routes);

app.use((req, res) => {
  res.sendStatus(404);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Express server listening on port ${PORT}`);
});
