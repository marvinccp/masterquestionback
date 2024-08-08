const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_PUBLIC_URL,
  // process.env.DB_NAME,
  // process.env.DB_USERNAME,
  // process.env.DB_PASSWORD,
  {
    // host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    }
  },
  
);

module.exports = sequelize;
