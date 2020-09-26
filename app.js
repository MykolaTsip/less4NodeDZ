const express = require('express');
const carRout = require('./routers/car.router')
const server = express();

const instance = require('./database').getInstance();
instance.setModels()


server.use(express.urlencoded({extends: true}));
server.use(express.json())


server.use('/cars', carRout)

server.listen(5002, (err) => {
    if (err) {
        console.log(err)
    }
    console.log('localhost 5002 is work!')
})
