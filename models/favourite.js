import Sequelize from 'sequelize';
import db from '../database/dbconn.js';

export default db.define('favourite', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    movieId: {
        type: Sequelize.STRING(9),
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
    }
}, {
    timestamps: false,
    underscored: true
});