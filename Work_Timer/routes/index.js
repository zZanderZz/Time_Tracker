const express = require('express')
const router = express.Router()
const passport = require('passport')
const funcionariosRoutes = require("./funcionarios.router");

//adionando models
const Post = require('../models/Post')
const routes = new express.Router();


router.get('/login', (req, res) => {
//    res.render('login/login')
    res.send("Teste");
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

routes.use("/funcionarios", funcionariosRoutes);


module.exports = routes;