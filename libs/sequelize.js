const { config } = require('../config/config');
const { Sequelize } = require('sequelize');
const { setUpModels } = require('../db/models/index');

const USER = encodeURIComponent(config.dbUser); //Enruteamos el usuario
const PASSWORD = encodeURIComponent(config.dbPassword); //enruteamos la contraseña
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//const pool = new Pool({ connectionString:URI }); -> sequalize utiliza por detras pool

const options = {
  dialect:'postgres',
  logging:config.isProd ? false : true //El logging true es necesario en producción
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const sqlize = new Sequelize(URI,options);

setUpModels(sqlize);

module.exports = sqlize;
