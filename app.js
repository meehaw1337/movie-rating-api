import express from 'express'
import usersRouter from './routes/users.js'
import moviesRouter from './routes/movies.js'
import auth from './middlewares/auth.js'

const app = express()
app.use(express.json())

const PORT = 3001
const API_PATH = '/api'

app.use(API_PATH + '/users', usersRouter)
app.use(API_PATH + '/movies', auth, moviesRouter)

app.listen(PORT, () => {
    console.log('App up and running, listening on port ' + PORT)
    console.log('Press CTRL+C to terminate the app')
})

