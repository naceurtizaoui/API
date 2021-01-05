const dbConfig = require("../config/db_config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,


  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

db.parking = require("./parking.model.js")(sequelize, Sequelize);
db.floor = require("./floor.model.js")(sequelize, Sequelize);

db.place = require("./place.model.js")(sequelize, Sequelize);

//Association user/role
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

//Association parking/floor
db.parking.hasMany(db.floor, { as: "floors" });
db.floor.belongsTo(db.parking, {
  foreignKey: "parkingId",
  as: "parking",
});

//Association floor/place
db.floor.hasMany(db.place, { as: "places" });
db.place.belongsTo(db.floor, {
  foreignKey: "floorId",
  as: "floor",
});

//Association place/user
db.user.hasOne(db.place, {  
  foreignKey: "userId",
  as: "place",
});
db.place.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

db.ROLES = ["user", "admin"];

module.exports = db;
