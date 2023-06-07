const express = require("express");
const supervisorController = require("../controller/supervisor.controller");

const routes = new express.Router();

routes.get("/", supervisorController.buscaTodos);
routes.get("/:id([0-9]+)", supervisorController.buscaPorId);
routes.post("/", supervisorController.inserir);
routes.delete("/:id([0-9]+)", supervisorController.deletar);
routes.put("/:id([0-9]+)", supervisorController.atualizar);

//ROTAS RENDER
routes.get("/cadastro_supervisor", (req, res) =>
  res.render("cadastro_supervisor")
);

module.exports = routes;
