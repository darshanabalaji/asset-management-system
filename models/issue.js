const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Issue = sequelize.define('Issue', {

    issue_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    asset_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    issue_date: {
        type: DataTypes.DATEONLY
    }

});

module.exports = Issue;