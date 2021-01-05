module.exports = app => {
    const floors = require("../controllers/floor.controller");
  
    var router = require("express").Router();
  
    // Create a new parking
    router.post("/", floors.create);

    // Retrieve all floors
    router.get("/", floors.findAll);

    // Retrieve a single floor with id
    router.get("/:id",floors.findFloorById)
  
    app.use('/api/floor', router);
  };