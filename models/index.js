const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('farrukh', 'root','fast0041se',{
    dialect:'mysql',
    host:'localhost'
})
module.exports = sequelize;