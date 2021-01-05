module.exports = app => {
    const places = require("../controllers/place.controller");
  
    var router = require("express").Router();
  
    // Create a new parking
    router.post("/", places.create);

     // Retrieve all places
     //router.get("/", places.findAll);

     // Retrieve a single place with id
    router.get("/:id",places.findPlaceById);

    //assigned place
    router.post("/:id",places.assignedPlace);

    //deassigned place
    router.put("/deassigned/:id",places.deassignedPlace);

    // search availible place by floor
   //router.get("/",places.findPlaceByFloor);

   // search availible place by user
   router.get("/",places.findPlaceUser)
   
  
    app.use('/api/place', router);

  };