const express = require("express");
const UserController = require("./controllers/UserController");

const routes = express.Router();

routes.post("/users", UserController.store);
routes.get("/users", UserController.list);
routes.get("/users/:id", UserController.consult);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.delete);
 
module.exports = routes;