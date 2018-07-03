const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./server/routes');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_CONNECTION_STRING);
mongoose.connection
    .on('error', error => console.log('Error connecting to MongoDB:', error))
    .once('open', () => console.log('Connected to MongoDB.'))

const app = express();

app.use(bodyParser.json());
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
