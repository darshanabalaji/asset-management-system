const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Scrap = sequelize.define('Scrap', {

    scrap_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    asset_name: {
        type: DataTypes.STRING
    },

    scrap_date: {
        type: DataTypes.DATEONLY
    }

});

module.exports = Scrap;