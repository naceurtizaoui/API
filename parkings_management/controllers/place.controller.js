const db = require("../models");
const Place = db.place;
const Floor = db.floor;
const Op = db.Sequelize.Op;

// Create and Save a new floor
exports.create = (req, res) => {
    // Validate request
    if (!req.body.number_place) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a new place
    const place = {
        number_place: req.body.number_place,
        duration_occupation:req.body.duration_occupation,
        availability:req.body.availability ? req.body.availability : true,
        floorId: req.body.floorId,
       
    };
  
    // Save place in the database
    Place.create(place)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the place."
        });
      });
};

exports.findAll = (req, res) => {

    Place.findAll({ include: ["floor"] })
      .then(place => {
        res.status(200).send(place);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving places."
        });
      });
    
};


exports.findPlaceById = (req, res) => {
    const id = req.params.id;
  
    Place.findByPk(id, { include: ["floor","user"] })
      .then((place) => {
        res.status(200).send(place);
      })
      .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving place ."
          });
      });
};

exports.assignedPlace = (req, res) => {

    const id_place = req.params.id;
    Place.findByPk(id_place,{ include: ["floor"] })
      .then(place => {
          place.update(req.body,{

          })
          .then(
            res.status(200).send({message:"Place was assigned successfully "}));
    })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while assigning place to user."
        });
      });
    
};

exports.deassignedPlace = (req, res) => {

    const id_place = req.params.id;
    Place.findByPk(id_place,{ include: ["floor"] })
      .then(place => {
          place.userId=null;
          place.update(place)
          .then(
            res.status(200).send(place));
    })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while deassigning place to user."
        });
      });
    
};

exports.findPlaceByFloor = (req, res) => {

   const idfloor=req.body.floorId;

    Place.findAll({ 
        where: { 
            [Op.and]: [{  floorId:idfloor }, { availability:true }],  
            }
    })
      .then((place) => {
        res.status(200).send(place);
      })
      .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving place ."
          });
      });
};

exports.findPlaceUser = (req, res) => {
    const iduser=req.body.userId;
    Place.findAll({   where: { 
       userId:iduser ,  
        },
        include: ["user"]})
      .then(place => {
        res.status(200).send(place);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving places by user."
        });
      });
  };
