const express = require("express");
const funcionariosRoutes = require("./funcionarios.router");
const chefesRoutes = require("./chefes.router");
const setorRoutes = require("./setor.router");
const supervisorRoutes = require("./supervisor.router");
const admRoutes = require("./adm.router");
const usuarioRoutes = require("./usuario.router");
const routes = new express.Router();


const express = require('express')
const router = express.Router()
const passport = require('passport')

//adionando models
const Post = require('../models/Post')

router.get('/login', (req, res) => {
    res.render('login/login')
})

router.post('/auth', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: '/cadastro',
        failureFlash: false,

    })(req, res, next)
})


router.get('/', (req, res) => {
    res.send('Logado com Sucesso!')
})


module.exports = routes;
