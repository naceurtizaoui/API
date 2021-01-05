module.exports = (sequelize, Sequelize) => {
    const Parking= sequelize.define("parking", {
      occupation: {
        type: Sequelize.DOUBLE
      },
      utilisation: {
        type: Sequelize.DOUBLE
      },
      location: {
        type: Sequelize.STRING
      }
    });
  
    return Parking;
  };