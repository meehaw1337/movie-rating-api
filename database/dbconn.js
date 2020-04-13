import Sequelize from 'sequelize';
import dotenv from 'dotenv'

dotenv.config()

/* Establish database connection */
let db = new Sequelize(process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
})

/* Create database tables if they don't exist */
db.sync({
    force: true
})

console.log(new Date().toLocaleString() + ' Database connection established')

export default db