import { DataTypes } from 'sequelize';
import { sequelize } from './morrodb.js';
import users from './users.js';  // Importa el modelo Users

const orders = sequelize.define('orders', {
  id_order: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date_order: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('in progress', 'sended', 'delivered', 'cancelled', 'on hold'),
    defaultValue: 'in progress',
  },
  
}, {
  timestamps: false,
  tableName: 'orders',
});

// Relaciones
orders.associate = (models) => {

  orders.hasMany(models.detail_order,{
    foreignKey:{
      allowNull: false,
    }
  })

  orders.hasOne(models.pay,{
    foreignKey:{
      allowNull: false,
    }
  })

  orders.hasOne(models.send,{
    foreignKey:{
      allowNull: false,
    }
  })

  orders.belongsTo(models.users, {
      foreignKey: {
          allowNull: false,
      },
  });

  return orders;
};

export default orders;
