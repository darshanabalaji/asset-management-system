const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Return = sequelize.define('Return', {

    return_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    employee_name: {
        type: DataTypes.STRING
    },

    asset_name: {
        type: DataTypes.STRING
    },

    return_date: {
        type: DataTypes.DATEONLY
    }

});

module.exports = Return;