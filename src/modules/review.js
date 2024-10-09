import { DataTypes } from 'sequelize';
import {sequelize} from './morrodb.js';
import users from './users.js';
import { models } from './associations.js';

const review = sequelize.define('reviews', {
  id_review: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  calification: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  commentary: {
    type: DataTypes.TEXT,
  },
  date_review: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  photo:{
    type: DataTypes.STRING,
    allowNull: true,
    
  },
 
}, {
  timestamps: false,
  tableName: 'reviews'
});

review.associete = (models) =>{

  review.belongsTo(models.users,{
    foreignKey:{
      allowNull: false,
    }
  })
  return review
}

export default review;
