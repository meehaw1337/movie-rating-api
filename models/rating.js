import Sequelize from 'sequelize';
import db from '../database/dbconn.js';

export default db.define('rating', {
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
    },
    rating: {
        type: Sequelize.REAL
    }
}, {
    timestamps: false,
    underscored: true
});