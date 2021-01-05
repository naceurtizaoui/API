module.exports = app => {
    const parkings = require("../controllers/parking.controller");
  
    var router = require("express").Router();
  
    // Create a new parking
    router.post("/", parkings.create);
  
    // Retrieve all parking
    router.get("/", parkings.findAll);
  
    // Retrieve a single parking with id
    router.get("/:id", parkings.findOne);
  
    // Update a parking with id
    router.put("/:id", parkings.update);
  
    // Delete a parking with id
    router.delete("/:id", parkings.delete);
  
  
    app.use('/api/parkings', router);
  };