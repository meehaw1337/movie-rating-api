import Sequelize from 'sequelize';
import db from '../database/dbconn.js';

const UNIQUE_CONSTRAINT_NAME = 'movie_rating_unique_constraint'

export default db.define('rating', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    movieId: {
        type: Sequelize.STRING(9),
        allowNull: false,
        unique: UNIQUE_CONSTRAINT_NAME
    },
    userId: {
        type: Sequelize.INTEGER,
        unique: UNIQUE_CONSTRAINT_NAME
    },
    rating: {
        type: Sequelize.REAL
    }
}, {
    timestamps: false,
    underscored: true
});