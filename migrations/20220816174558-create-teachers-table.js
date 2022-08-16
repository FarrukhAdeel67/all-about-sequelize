'use strict';
const {DataTypes} = require('sequelize');
const moment = require("moment");
const name = 'farrukh adeel';
const email = 'm.farrukhadeel@gmail.com';
const createdAt = moment().unix();
const updatedAt = moment().unix();
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('teachers',{
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
    createdAt:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    updatedAt:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    })
    
    await queryInterface.sequelize.query(`INSERT INTO teachers (name, email,createdAt, updatedAt) VALUES ('${name}', '${email}', ${createdAt},${updatedAt})` )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('teachers')
  }
};
