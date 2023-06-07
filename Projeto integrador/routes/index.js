const express = require("express");
const funcionariosRoutes = require("./funcionarios.router");
const chefesRoutes = require("./chefes.router");
const setorRoutes = require("./setor.router");
const supervisorRoutes = require("./supervisor.router");
const admRoutes = require("./adm.router");
const usuarioRoutes = require("./usuario.router");


const routes = new express.Router();

routes.use("/funcionarios", funcionariosRoutes);
routes.use("/chefes", chefesRoutes);
routes.use("/setor", setorRoutes);
routes.use("/supervisor", supervisorRoutes);
routes.use("/adm", admRoutes);
routes.use("/usuario", usuarioRoutes);

module.exports = routes;
