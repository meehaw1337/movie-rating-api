import Sequelize from 'sequelize'
import db from '../database/dbconn.js'
import favourite from './favourite.js'
import rating from './rating.js'

const user = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(30),
        allowNull: false
    }
}, {
    timestamps: false,
    underscored: true
})

/* Create associations between models */
user.hasMany(favourite)
user.hasMany(rating)

export default user