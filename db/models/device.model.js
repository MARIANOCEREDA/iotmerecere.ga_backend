
const {Model,DataTypes,Sequelize} = require('sequelize');
const { USER_TABLE }=require('./user.model');

const DEVICE_TABLE = 'devices';

/**
*@name DeviceSchema
*@description Modelo de usuarios para la tabla en POSTGRES
*@type Object
*/
const DeviceSchema = {
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.INTEGER
    },
    name:{
      allowNull:false,
      type:DataTypes.STRING,
      length:255
    },
    description:{
      type:DataTypes.TEXT,
      allowNull:true,
    },
    mqttConected:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false
    },
    appConected:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false
    },
    createdAt:{
        allowNull:false,
        type:DataTypes.DATE,
        filed:'createdAt',
        defaultValue:Sequelize.NOW
    },
    userId:{
      field:'userId',
      allowNull:false,
      type:DataTypes.INTEGER,
      references:{
        model:USER_TABLE,
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'SET NULL'
    }
}

class Device extends Model{
    static associate(models){ //Los metodos estaticos no necesitan una instancia de la clase para ser llamados.
      this.belongsTo(models.User,{as:'user'});
      this.belongsToMany(models.Group,{
        as:'item',
        through:models.Device_Group,
        foreignKey:'deviceId',
        otherKey:'groupId'
      });
    }

    static config(sequelize){
    /**@description: Método que retorna la configuracion de mi modelo,
      *@params {Object} - sequelize: Contiene la conexión
      *@returns {Object} - Contiene la configración de mi modelo*/
        return{
            sequelize,
            tableName:DEVICE_TABLE,
            modelName:'Device',
            timestamps:false
        }
    }
}

module.exports = { DEVICE_TABLE,DeviceSchema,Device}
