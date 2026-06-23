const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Asset = sequelize.define('Asset', {
    asset_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    asset_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    asset_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serial_number: {
        type: DataTypes.STRING
    },
    asset_value: {
        type: DataTypes.DECIMAL(10,2)
    },
    purchase_date: {
        type: DataTypes.DATEONLY
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'In Stock'
    }
});

module.exports = Asset;