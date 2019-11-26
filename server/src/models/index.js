// const fs = require('fs')
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


// fs
//     .readdirSync(__dirname)
//     .filter( file => file !== 'index.js')
//     .forEach( file => {
//         const model = sequelize.import(path.join(__dirname, file))
//         db[model.name] = model
//     })
db.User = sequelize.import(path.join(__dirname, 'User.js'))
db.BlogPost = sequelize.import(path.join(__dirname, 'BlogPost.js'))


db.User.hasMany(db.BlogPost)
db.BlogPost.belongsTo(db.User)


db.sequelize = sequelize
db.Sequelize = Sequelize




module.exports = db
