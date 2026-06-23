const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Issue = sequelize.define('Issue', {

    issue_id: {
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

    issue_date: {
        type: DataTypes.DATEONLY
    }

});

module.exports = Issue;