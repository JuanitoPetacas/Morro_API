import { DataTypes, ENUM } from 'sequelize';
import {sequelize} from './morrodb.js';
import categories from './categories.js';
import { models } from './associations.js';

const product = sequelize.define('products', {
  id_product: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name_product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: ENUM ('inactive', 'active'),
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
  }

}, {
  timestamps: false,
  tableName: 'products'
});

product.associate = (models) => {
  product.hasMany(models.detail_carshop,{
    foreignKey:{
      allowNull: false,
    }
  })
  
  product.hasMany(models.detail_order,{
    foreignKey:{
      allowNull: false,
    }
  })

  product.belongsTo(models.categories, {
      foreignKey: {
          allowNull: false,
      },
  });



  return product;
};


export default product;
