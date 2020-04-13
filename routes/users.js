import jwt from 'jsonwebtoken'
import express from 'express'
import dotenv from 'dotenv'
import User from '../models/user.js'

dotenv.config()
const router = express.Router()

router.post('/register', (req, res) => {
    console.log(new Date().toLocaleString() + '  Request received: POST at /user/register')

    User.create(req.body)
        .then((result) => {
            res.send('User ' + result.username + ' registered')
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

router.post('/login', (req, res) => {
    console.log(new Date().toLocaleString() + '  Request received: POST at /user/login')

    User.findOne({
        where: {
            username: req.body.username
        }
    }).then((result) => {
        if (result.password === req.body.password) {
            const token = jwt.sign({ _id: result.id }, process.env.SECRET)
            res.header('auth-token', token).send('User ' + result.username + ' logged in')
        } else {
            res.status(401).send('Invalid username or password')
        }
    }).catch((error) => {
        res.status(401).send('Invalid username or password')
    })
})

export default router