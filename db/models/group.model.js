
const {Model,DataTypes,Sequelize} = require('sequelize');
const {USER_TABLE} = require('../models/user.model');

const GROUP_TABLE = 'groups';

/**
*@name GroupSchema
*@description Modelo de grupos para la tabla de psql
*@type Object
*/
const GroupSchema = {
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

class Group extends Model{
    static associate(models){ //Los metodos estaticos no necesitan una instancia de la clase para ser llamados.
      this.belongsTo(models.User,{as:'user'});
      this.hasMany(models.Device,{
        as:'GroupHasDevices',
        foreignKey:'groupId'
      });
    }

    static config(sequelize){
    /**@description: Metodo que retorna la configuracion de mi modelo,
        *@params {Object} - sequelize: Contiene la conexión
        *@returns {Object} - Contiene la configración de mi modelo*/
        return{
            sequelize,
            tableName:GROUP_TABLE,
            modelName:'Group',
            timestamps:false
        }
    }
}

module.exports = { GROUP_TABLE,Group,GroupSchema}
