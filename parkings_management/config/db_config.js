module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "postgresql",
    DB: "parkings_management",
    dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
  };