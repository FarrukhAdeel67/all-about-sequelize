const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('farrukh', 'root','pps993icp956',{
    dialect:'mysql',
    host:'localhost'
})
module.exports = sequelize;