import { DataTypes } from 'sequelize';
import {sequelize} from './morrodb.js';
import carshop from './carshop.js';
import product from './products.js';
import { models } from './associations.js';

const detail_carshop = sequelize.define('detail_carshop', {
  id_detail_carshop: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
   
  },
 
}, {
  timestamps: false,
  tableName: 'detail_carshop'
});


detail_carshop.associate = (models)=>{
  detail_carshop.belongsTo(models.carshop,{
    foreignKey:{
      allowNull: false,
    }
  })
  detail_carshop.belongsTo(models.product,{
    foreignKey:{
      allowNull: false,
    }
  })
  return detail_carshop
}



export default detail_carshop;
