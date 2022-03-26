require('dotenv').config();

const config = {
  isProd:false,
  apiKey:process.env.API_KEY,
  appPort:process.env.APP_PORT,
  dbUser:process.env.DB_USER,
  dbPort:process.env.DB_PORT,
  dbPassword:process.env.DB_PASSWORD,
  dbName:process.env.DB_NAME,
  dbHost:process.env.DB_HOST,
  dbUrl:process.env.DB_URL,
  mqttWsPort:process.env.MQTT_WS_PORT,
  mqttWssPort:process.env.MQTT_WSS_PORT,
  mqttUser:process.env.MQTT_USER,
  mqttPassword:process.env.MQTT_PASSWORD
}

module.exports = {config};
