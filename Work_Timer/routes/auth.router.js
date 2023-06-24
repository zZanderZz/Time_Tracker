const express = require("express");
const passport = require('passport')
const authController = require('../controller/auth.controller')

const routes = new express.Router();

routes.post('/',authController.auth)

module.exports = routes;