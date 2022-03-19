/**
 * @description: Main module for the app execution:
 * - Declaration of express app
 * - Definition of middlewares order of execution
 * - Cors definition for allowed ip directions
 * @required:
 * - library: express - main lib to create the server
 * - library: cors - it's to allow the connection of some ip's
 * - object: config - it contains environment vars.
 * - function: routerApi - it contains api's routes.
 * - function:logError - middleware
 * - function: errorHandler - middleware
 * - function: ormErrorHandler - middleware
*/

const express = require('express');
const cors = require('cors');
const { config } = require('./config/config');
const routerApi = require('./routes');
const { logErrors,errorHandler,boomErrorHandler,ormErrorHandler } = require('./middlewares/error.handler');
const { mqttConnect,mqttSubscribe } = require('./mqtt/mqtt.subscribe');

const subsTopic = "/nodejs/mqtt"

const app  = express();
app.use(express.json()); //it converts any requets in a json-format request.

const whitelist = ['http://localhost:8080', 'https://localhost:8083','http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Request is not allowed!'));
    }
  }
}
app.use(cors(options));

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Server from express!');
  });

app.listen(config.appPort,()=>{
    console.log(`App listening to port ${config.appPort}`);
});

//const client = mqttConnect();
//mqttSubscribe(client,subsTopic);
