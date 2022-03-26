const {models,sequelize} = require('../libs/sequelize');
const boom = require('@hapi/boom');
const mqtt = require('mqtt');
const { config } = require('../config/config');
const bcrypt = require('bcrypt');

class MqttService{

  constructor(){
    this.client=null;
  }

  async connect(data){
    const username = data.username;
    const password = data.password;
    const hashPassword = sequelize.query(`SELECT password FROM users WHERE username=${username}`);
    const validated= await bcrypt.compareSync(password,hashPassword);
    const clientData = {
      clean: true,
      connectTimeout: 4000,
      username: config.mqttUser,
      password: config.mqttPassword,
      reconnectPeriod: 1000,
      keepalive:60
    }

    if(appData.connect && validated){
      this.client = await mqtt.connect(config.mqttUrl,clientData);
    }
    return this.client;
  }

  async subscribe(topic){
    //Subscripcion a topico
    this.client.on("connect", () => {
      console.log("Connected");
      this.client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`);
      });
    });

    this.client.on("message", (topic, payload) => {
        console.log("Received Message:", topic, payload.toString());
    });
  }

}

module.exports = { MqttService }
