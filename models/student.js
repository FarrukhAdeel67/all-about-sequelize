const moment = require("moment");
const sequelize = require("./index");
const {DataTypes} = require('sequelize');
const tablename = 'students';
const Students =  sequelize.define("students",{
    id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement: true//if id doesnt have value then throw error.
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    writer:{
        type:DataTypes.STRING,
        allowNull:false

    },
    createdAt:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    updatedAt:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});
Students.beforeCreate(function (student){
    student.dataValues.createdAt = moment().unix();
    student.dataValues.updatedAt = moment().unix();
})
Students.afterUpdate(function (student){
    student.dataValues.updatedAt = moment().unix();
})
module.exports = Students;
