import { DataTypes } from 'sequelize';
import { sequelize } from './morrodb.js';

const users = sequelize.define('users', {
  id_user: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_user: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
  },
  rol: {
    type: DataTypes.ENUM('client', 'admin'),
    defaultValue: 'client',
  },
  status:{
    type: DataTypes.ENUM('inactive', 'active'),
    allowNull: false,

  }
}, {
  timestamps: false,
  tableName: 'users'
});

users.associate = (models) => {

  users.hasMany(models.review, {
    foreignKey: {
      allowNull: false,
    },
  });

  users.hasMany(models.orders, {
    foreignKey:{
      allowNull: false,
    }
  });
  users.hasOne(models.carshop,{
    foreignKey:{
      allowNull: false,
    }
  })


  return users;
};

export default users;
