const express = require("express");
const edicaofuniocarioController = require("../controller/edicao.funcionario.controller");

const routes = new express.Router();

routes.get("/", edicaofuniocarioController.buscaTodos);
routes.get("/:id([0-9]+)", edicaofuniocarioController.buscaPorId);
routes.post("/", edicaofuniocarioController.inserir);
routes.delete("/:id([0-9]+)", edicaofuniocarioController.deletar);
routes.put("/:id([0-9]+)", edicaofuniocarioController.atualizar);

//ROTAS RENDER
routes.get("/cadastro_func_adm", (req, res) =>
  res.render("cadastro_fnc_adm")
);

module.exports = routes;