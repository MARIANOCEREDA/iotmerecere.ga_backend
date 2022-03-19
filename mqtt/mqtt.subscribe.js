/*
Subscripción a topicos mqtt.
Más informacion en: https://docs.emqx.com/en/cloud/latest/connect_to_deployments/nodejs_sdk.html#connection
*/

const mqtt = require('mqtt');
const { config } = require('../config/config');

/**
*@name mqttConnect
*@description- It generates the connection with the mqtt server
@returns client - is the object that contains the connection.
*/

function mqttConnect(){
  const client = mqtt.connect(config.mqttUrl, {
    //clientId:config.mqttClientId,
    clean: true,
    connectTimeout: 4000,
    username: config.mqttUser,
    password: config.mqttPassword,
    reconnectPeriod: 1000,
    keepalive:60
  });
  return client;
}

function mqttSubscribe(client,subsTopic){
  //Subscripcion a topico
  client.on("connect", () => {
    console.log("Connected");
    client.subscribe([subsTopic], () => {
      console.log(`Subscribe to topic '${subsTopic}'`);
    });
  });

  client.on("message", (subsTopic, payload) => {
      console.log("Received Message:", subsTopic, payload.toString());
  });
}

function mqttPublish(pubTopic){

}

module.exports = {mqttConnect,mqttSubscribe,mqttPublish};
