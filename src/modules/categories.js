import { DataTypes } from 'sequelize';
import {sequelize} from './morrodb.js';

const categories = sequelize.define('categories', {
  id_category: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name_category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: false,
  tableName: 'categories'
});

export default categories;


categories.associate = (models) => {


  categories.hasMany(models.product, {});

  return categories;
};