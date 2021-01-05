const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  //read information user/admin by token
  app.get("/api/user",
  [authJwt.verifyToken],
  controller.findUser
  )

  //read information user by id
  app.get("/api/user/:id",controller.findUserById)

  // delete user
  app.delete("/api/user/delete",
  [authJwt.verifyToken],
  controller.deleteUser
  )

  // update user
  app.put("/api/user/update",
  [
    authJwt.verifyToken,
    verifySignUp.checkDuplicateUsernameOrEmailUpdate
  ],
  controller.updateUser
  )


};