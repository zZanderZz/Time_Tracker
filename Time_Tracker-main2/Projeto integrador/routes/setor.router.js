const express = require("express");
const setorController = require("../controller/setor.controller");

const routes = new express.Router();

routes.get("/", setorController.buscaTodos);
routes.get("/:id([0-9]+)", funcionariosController.buscaPorId);
routes.post("/", funcionariosController.inserir);
routes.delete("/:id([0-9]+)", funcionariosController.deletar);
routes.put("/:id([0-9]+)", funcionariosController.atualizar);

//ROTAS RENDER
routes.get("/cadastro_funcionario_no_setor", (req, res) =>
    res.render("cadastro_funcionario_no_setor")
);

module.exports = routes;