const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const { application } = require('express');
dotenv.config()
const sequelize = new Sequelize('group-application','root','1234',
    {
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;