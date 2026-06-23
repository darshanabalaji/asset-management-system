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
        allowNull: true,
        references: {
            model: 'Employees',
            key: 'employee_id'
        }
    },

    asset_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Assets',
            key: 'asset_id'
        }
    },

    issue_date: {
        type: DataTypes.DATEONLY
    }

});

module.exports = Issue;