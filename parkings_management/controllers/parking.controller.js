const db = require("../models");
const Parking = db.parking;

// Create and Save a new parking
exports.create = (req, res) => {
    // Validate request
    if (!req.body.location) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a new parking
    const parking = {
        occupation: req.body.occupation,
        utilisation: req.body.utilisation,
        location: req.body.location,
      
    };
  
    // Save parking in the database
    Parking.create(parking)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the parking."
        });
      });
  };

// Retrieve all parkings from the database.
exports.findAll = (req, res) => {

  Parking.findAll({ include: ["floors"] })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving parkings."
      });
    });
  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Parking.findByPk(id, { include: ["floors"] })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving parking with id=" + id
        });
      });
};

// Update a parking by the id in the request
exports.update = (req, res) => {
  
};

// Delete a parking with the specified id in the request
exports.delete = (req, res) => {
  
};

