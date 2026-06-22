const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'asset_management', // database name
    'postgres',         // username
    'Orange@25', // your PostgreSQL password
    {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432
    }
);

module.exports = sequelize;