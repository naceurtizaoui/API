const { floor } = require("../models");
const db = require("../models");
const Parking = db.parking;
const Floor = db.floor;

// Create and Save a new floor
exports.create = (req, res) => {
    // Validate request
    if (!req.body.number_floor) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a new floor
    const floor = {
        number_floor: req.body.number_floor,
        parkingId: req.body.parkingId,
       
    };
  
    // Save floor in the database
    Floor.create(floor)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the floor."
        });
      });
};

exports.findAll = (req, res) => {

    Floor.findAll({ include: ["places","parking"] })
      .then(floor => {
        res.status(200).send(floor);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving all floors."
        });
      });
    
};
  
exports.findFloorById = (req, res) => {
    const id = req.params.id;
  
    Floor.findByPk(id, { include: ["parking"] })
      .then((floor) => {
        res.status(200).send(floor);
      })
      .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving the floor."
          });
      });
  };
