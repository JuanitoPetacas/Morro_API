import { DataTypes } from 'sequelize';
import {sequelize} from './morrodb.js';
import order from './order.js';
import { stat } from 'fs';

const send = sequelize.define('send', {
  id_send: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  agency:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type: DataTypes.ENUM('pending', 'sent', 'cancelled'),
    allowNull: false,
  }
  
}, {
  timestamps: false,
  tableName: 'send'
});

send.associate = (models) => {

  
  send.belongsTo(models.orders, {
      foreignKey: {
          allowNull: false,
      },
  });

  send.belongsTo(models.pay,{
    foreignKey:{
      allowNull: false,
    },
  })

  return send;
};
export default send;
