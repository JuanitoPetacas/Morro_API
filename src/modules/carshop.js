import { DataTypes } from 'sequelize';
import {sequelize} from './morrodb.js';
import users from './users.js';
import product from './products.js';
import { models } from './associations.js';

const carshop = sequelize.define('carshop', {
  id_carshop: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date_creation: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total_price:{
    type: DataTypes.FLOAT,
    allowNull: false,
  },

}, {
  timestamps: false,
  tableName: 'carshop'
});

carshop.associate = (models) =>{
  carshop.belongsTo(models.users,{
    foreignKey:{
      allowNull: false,
    }
  })
  carshop.hasMany(models.detail_carshop,{
    foreignKey:{
      allowNull: false,
    }
  })
  return carshop
}



export default carshop;
