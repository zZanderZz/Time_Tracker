const express = require('express')
const router = express.Router()
const funcionariosRoutes = require("./funcionarios.router");
const cadastro = require("./cadastro.routes");
const auth = require("./auth.router");

//adionando models
const Post = require('../models/Post')
const routes = new express.Router();


// router.get('/login', (req, res) => {
// //    res.render('login/login')
//     res.send("Teste");
// })

router.get('/', (req, res) => {
    res.send('Logado com Sucesso!')
})


routes.use("/funcionarios", funcionariosRoutes);
routes.use("/cadastro", cadastro);
routes.use("/auth",auth);


module.exports = routes;