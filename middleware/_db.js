// import .env data
import * as dotenv from "dotenv";
dotenv.config();

// import sequelize for mssql
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.MSSQL_DATABASE,
  process.env.MSSQL_USER,
  process.env.MSSQL_PASSWORD,
  {
    host: process.env.MSSQL_SERVER,
    dialect: "mssql",
    logging: false,
    dialectOptions: {
      options: {
        encrypt: true, // Enable if using Azure SQL
      },
    },
  }
);

export { sequelize };
