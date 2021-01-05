module.exports = (sequelize, Sequelize) => {
    const Place= sequelize.define("place", {
      duration_occupation: {
        type: Sequelize.DOUBLE
      },
      number_place:{
        type: Sequelize.INTEGER
      },
      availability: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Place;
  };