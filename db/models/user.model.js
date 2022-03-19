
const {Model,DataTypes,Sequelize} = require('sequelize');

const USER_TABLE = 'users';


/**
*@name UserSchema
*@description Modelo de usuarios para la tabla en POSTGRES
*@type Object
*/
const UserSchema = {
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.INTEGER
    },
    username:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      length:100
    },
    password: {
        allowNull:false,
        type:DataTypes.STRING,
        length:100
    },
    salt:{
      type:DataTypes.STRING,
      length:40
    },
    is_superuser:{
      type:DataTypes.BOOLEAN,
    },
    firstName:{
      type:DataTypes.STRING,
      allowNull:false,
      length:255
    },
    lastName:{
      type:DataTypes.STRING,
      allowNull:false,
      length:255
    },
    country:{
      type:DataTypes.STRING,
      allowNull:false,
      length:255
    },
    email:{
        allowNull:false,
        type:DataTypes.STRING,
        unique: true //Para que no haya emails iguales
    },
    age:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    recoveryToken:{
      field:'recoveryToken',
      allowNull:true,
      type:DataTypes.STRING,
    },
    createdAt:{
        allowNull:false,
        type:DataTypes.DATE,
        filed:'createdAt',
        defaultValue:Sequelize.NOW
    }
}

class User extends Model{
    static associate(models){ //Los metodos estaticos no necesitan una instancia de la clase para ser llamados.
      this.hasMany(models.Device,{
        as:'devices',
        foreignKey:'userId'
      });
    }

    static config(sequelize){
    /**@description: Metodo que retorna la configuracion de mi modelo,
        *@params {Object} - equelize: Contiene la conexión
        *@returns {Object} - Contiene la configración de mi modelo*/
        return{
            sequelize,
            tableName:USER_TABLE,
            modelName:'User',
            timestamps:false
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User}
