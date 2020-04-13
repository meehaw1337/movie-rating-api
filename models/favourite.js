import Sequelize from 'sequelize';
import db from '../database/dbconn.js';

const UNIQUE_CONSTRAINT_NAME = 'favourite_movie_unique_constraint'

export default db.define('favourite', {
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
    }
}, {
    timestamps: false,
    underscored: true
});