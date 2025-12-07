
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST_NAME,
    dialect: "mysql",
    port: Number(process.env.DB_PORT || 3306),
    timezone: process.env.TIMEZONE || "+05:30",
  },
);

export default sequelize;
