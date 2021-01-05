module.exports = (sequelize, Sequelize) => {
    const Floor= sequelize.define("floor", {
      number_floor:{
        type: Sequelize.INTEGER
      }
    });
  
    return Floor;
  };