const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('farrukh', 'root','',{
    dialect:'mysql',
    host:'localhost'
})
module.exports = sequelize;