
const {Model,DataTypes,Sequelize} = require('sequelize');
const {DEVICE_TABLE}=require('../models/device.model');
const {GROUP_TABLE}=require('../models/group.model');

const DEVICE_GROUP_TABLE = 'device_group';

/**
*@name GroupSchema
*@description Modelo de grupos para la tabla de psql
*@type Object
*/
const DeviceGroupSchema = {
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.INTEGER
    },
    createdAt:{
        allowNull:false,
        type:DataTypes.DATE,
        filed:'createdAt',
        defaultValue:Sequelize.NOW
    },
    deviceId:{
      field:'deviceId',
      allowNull:false,
      type:DataTypes.INTEGER,
      unique:true,
      references:{
        model:DEVICE_TABLE,
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'SET NULL'
    },
    GroupId:{
      field:'groupId',
      allowNull:false,
      type:DataTypes.INTEGER,
      unique:true,
      references:{
        model:GROUP_TABLE,
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'SET NULL'
    }
}

class DeviceGroup extends Model{
    static associate(models){ //Los metodos estaticos no necesitan una instancia de la clase para ser llamados.
    }

    static config(sequelize){
    /**@description: Metodo que retorna la configuracion de mi modelo,
        *@params {Object} - sequelize: Contiene la conexión
        *@returns {Object} - Contiene la configración de mi modelo*/
        return{
            sequelize,
            tableName:DEVICE_GROUP_TABLE,
            modelName:'Device_Group',
            timestamps:false
        }
    }
}

module.exports = { DEVICE_GROUP_TABLE,DeviceGroupSchema,DeviceGroup }
