const express = require("express");
const chefesController = require("../controller/chefes.controller");

const routes = new express.Router();

routes.get("/", chefesController.buscaTodos);
routes.get("/:id([0-9]+)", chefesController.buscaPorId);
routes.post("/", chefesController.inserir);
routes.delete("/:id([0-9]+)", chefesController.deletar);
routes.put("/:id([0-9]+)", chefesController.atualizar);

//ROTAS RENDER
routes.get("/cadastro_chefe", (req, res) =>
  res.render("cadastro_chefe")
);

module.exports = routes;
