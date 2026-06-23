const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {

    employee_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    employee_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    employee_code: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING
    },

    phone: {
        type: DataTypes.STRING
    },

    department: {
        type: DataTypes.STRING
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: 'Active'
    }

});

module.exports = Employee;