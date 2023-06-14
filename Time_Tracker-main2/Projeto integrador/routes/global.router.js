const express = require("express");
const globalController = require("../controller/global.controller");

const routes = new express.Router();

routes.get("/", funcionariosController.buscaTodos);
routes.get("/:id([0-9]+)", funcionariosController.buscaPorId);
routes.post("/", funcionariosController.inserir);
routes.delete("/:id([0-9]+)", funcionariosController.deletar);
routes.put("/:id([0-9]+)", funcionariosController.atualizar);
routes.get("/", chefesController.buscaTodos);
routes.get("/:id([0-9]+)", chefesController.buscaPorId);
routes.post("/", chefesController.inserir);
routes.delete("/:id([0-9]+)", chefesController.deletar);
routes.put("/:id([0-9]+)", chefesController.atualizar);
routes.get("/", globalController.buscaTodos);
routes.get("/:id([0-9]+)", globalController.buscaPorId);
routes.post("/", globalController.inserir);
routes.delete("/:id([0-9]+)", globalController.deletar);
routes.put("/:id([0-9]+)", globalController.atualizar);
routes.get("/", setorController.buscaTodos);
routes.get("/:id([0-9]+)", setorController.buscaPorId);
routes.post("/", setorController.inserir);
routes.delete("/:id([0-9]+)", setorController.deletar);
routes.put("/:id([0-9]+)", setorController.atualizar);
routes.get("/", setorController.buscaTodos);
routes.get("/:id([0-9]+)", setorController.buscaPorId);
routes.post("/", setorController.inserir);
routes.delete("/:id([0-9]+)", setorController.deletar);
routes.put("/:id([0-9]+)", setorController.atualizar);
routes.get("/", supervisorController.buscaTodos);
routes.get("/:id([0-9]+)", supervisorController.buscaPorId);
routes.post("/", supervisorController.inserir);
routes.delete("/:id([0-9]+)", supervisorController.deletar);
routes.put("/:id([0-9]+)", supervisorController.atualizar);


routes.get("/cadastro_funcionario", (req, res) =>
    res.render("cadastro_funcionario")
);
routes.get("/cadastro_setor", (req, res) =>
    res.render("cadastro_setor")
);



module.exports = routes;