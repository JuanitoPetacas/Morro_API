import { DataTypes } from 'sequelize';
import {sequelize} from './morrodb.js';
import product from './products.js';
import orders from './order.js';

const detail_order = sequelize.define('detail_order', {
  id_detail_order: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name_product:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  description:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price_product:{
    type: DataTypes.FLOAT,
    allowNull: false,
    
  },
  quantity_product:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: { min: 1 }
  },
  
 
}, {
  timestamps: false,
  tableName: 'detail_order'
});


detail_order.associate = (models) =>{

  detail_order.belongsTo(models.orders, {
    foreignKey:{
      allowNull:false,
    }
  })

  detail_order.belongsTo(models.product,{
    foreignKey:{
      allowNull:false,
    }
  })
  return detail_order
}
export default detail_order;
