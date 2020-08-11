var controller = controller || {}

controller.express = require('express')
controller.router = controller.express.Router()
controller.pool = require('./sql/database')
controller.passport = require('passport')
controller.electron = require('electron')

module.exports = controller