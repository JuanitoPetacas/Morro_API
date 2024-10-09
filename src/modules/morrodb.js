import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch((error) => {
    console.log('DB connection failed', error);
  });

