import { DataTypes } from 'sequelize';
import {sequelize} from './morrodb.js';
import order from './order.js';

const pay = sequelize.define('pay', {
  id_pay: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date_pay: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pay_method: {
    type: DataTypes.ENUM('target', 'PayPal', 'transference', 'others'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('cancelled', 'pay successfully'),
    allowNull: false,
  },
  
}, {
  timestamps: false,
  tableName: 'pay'
});

pay.associate = (models) => {

  pay.hasOne(models.send,{
    foreignKey:{
      allowNull: false,
    }
  })

  
  pay.belongsTo(models.orders, {
      foreignKey: {
          allowNull: false,
      },
  });

  return pay;
};
export default pay;
