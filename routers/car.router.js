const {Router} = require('express')
const carController = require('../controllers/car.controller')

let carRouter = Router()

carRouter.get('/', carController.fetchAll)

module.exports =  carRouter
