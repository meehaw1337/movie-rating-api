import express from 'express'
import axios from 'axios'
import Favourite from '../models/favourite.js'
import e from 'express'

const router = express.Router()

const OMDB_API_URL = 'http://www.omdbapi.com/'

router.get('/search', (req, res) => {
    const title = req.query.title

    if (title === undefined) {
        res.status(400).send('Missing required parameter: title')
    }

    axios.get(OMDB_API_URL, {
        params: {
            t: title,
            r: 'json',
            apikey: process.env.OMDB_API_KEY
        }
    }).then(axiosResponse => {
        res.send({
            Title: axiosResponse.data.Title,
            Year: axiosResponse.data.Year,
            Genre: axiosResponse.data.Genre,
            imdbID: axiosResponse.data.imdbID
        })
    }).catch(error => {
        console.error(error)
        res.status(500).send(error)
    })
})

router.post('/favourite', (req, res) => {
    const userId = req.user._id

    if (req.query.action === 'mark') {
        Favourite.create({
            userId: userId,
            movieId: req.query.movieId
        }).then(result => {
            res.send('Movie ' + req.query.movieId + ' added to favourites')
        }).catch(error => {
            res.status(400).send(error)
        })
    } else if (req.query.action === 'unmark') {
        Favourite.destroy({
            where: {
                userId: userId,
                movieId: req.query.movieId
            }
        }).then(result => {
            if (result > 0) {
                res.send('Movie ' + req.query.movieId + ' removed from favourites')
            } else {
                res.send('This movie was not marked as favourite')
            }
        }).catch(error => {
            res.status(400).send(error)
        })
    } else {
        res.status(400).send('Parameter: \'action\' not provided or invalid, should be \'mark\' or \'unmark\'')
    }
})

router.post('/rate', (req, res) => {
    
})

export default router