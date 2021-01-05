const db = require("../models");
const User = db.user;
var bcrypt = require("bcryptjs");
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
exports.userBoard = (req, res) => {
    res.status(200).send("User.");
};
  
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin.");
};

exports.findUser = (req, res, next) => {
  //avec id : User.findByPk(req.params.id).then(user => {
    User.findByPk(req.userId).then(user => {
        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            place: user.place,
            roles: authorities
          });
        });
        })
          .catch(err => {
            res.status(500).send({
              message: "Required"
            });
          });
};

exports.findUserById = (req, res, next) => {
  User.findByPk(req.params.id).then(user => {
        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            place: user.place,
            roles: authorities
          });
        });
        })
          .catch(err => {
            res.status(500).send({
              message: "Required"
            });
          });
};

exports.updateUser = (req, res) => {
    User.findByPk(req.userId).then(user => {

        let updateValues = { 
            username: req.headers.username,
            firstName: req.headers.firstName,
            lastName: req.headers.lastName,
            email: req.headers.email,
            password: bcrypt.hashSync(req.headers.password, 8) };
  
        user.update(updateValues)
          .then(
            res.status(200).send({message:"User was updated successfully "}));
    })
      .catch(err => {
          console.log(err)
        res.status(500).send({
          message: "Update Failed"
        });
      });
}; 



exports.deleteUser = (req, res) => {
    User.findByPk(req.userId).then(user => {
        user.destroy().then(
            res.status(200).send({message:"User was deleted successfully"}));
    })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user"
        });
      });
}; 