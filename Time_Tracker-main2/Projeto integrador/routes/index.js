const express = require("express");
const funcionariosRoutes = require("./funcionarios.router");
const setorRoutes = require("./setor.router");
const globalRoutes = require("./global.router");


const routes = new express.Router();

routes.use("/funcionarios", funcionariosRoutes);
routes.use("/setor", setorRoutes);
routes.use("/global", globalRoutes);


module.exports = routes;