const {Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = (()=> {
    let instance;

    function initConnection() {
        const client = new Sequelize('auto_shop', 'user', 'root', {
            host: 'localhost',
            dialect: 'mysql'
        });

        let models = {};

        function getModels() {
            fs.readdir(path.join(process.cwd(), 'database', 'models'), (err, files)=> {
                files.forEach(file => {
                    const [modelName] = file.split('.')
                    models[modelName] = (require(path.join(process.cwd(), 'database', 'models', modelName)))(client, DataTypes)
                })
            })
        }



        return {
            model: models,
            getModel: (modelName) => models[modelName],
            setModels: () => getModels()
        }
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection()
            }

            return instance;
        }
    }
})()
