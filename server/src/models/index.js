const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
// const __dirname = path.resolve()


const db = {}

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options,
)


fs
    .readdirSync(__dirname)
    .filter( file => file !== 'index.js')
    .forEach( file => {
        console.log(path.join(__dirname, file))
        const model = sequelize.import(path.join(__dirname, file))
        console.log(model)
        db[model.name] = model
    })

db.sequelize = sequelize
db.Sequelize = Sequelize



module.exports = db