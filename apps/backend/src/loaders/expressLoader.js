const bodyParser = require('body-parser');
const cors = require('cors');

const { rootRoute } = require ('../config');
const routes = require('../routes');

module.exports = async (app) => {
  app.disable('x-powered-by');
  app.use(bodyParser.json({limit: '16mb'})); // increased to accommodate 1000 points/batch
  app.use(cors());

  app.use(rootRoute, routes);

  app.use((req, res) => {
    res.sendStatus(404);
  });

  app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message, data});
  });
};
