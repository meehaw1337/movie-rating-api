import express from 'express'
import axios from 'axios'
import Favourite from '../models/favourite.js'
import Rating from '../models/rating.js'

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

    if (req.body.movieId === undefined) {
        res.status(400).send('Body must contain movieId')
        return
    }

    if (req.query.action === 'mark') {
        Favourite.create({
            userId: userId,
            movieId: req.body.movieId
        }).then(result => {
            res.send('Movie ' + req.body.movieId + ' added to favourites')
        }).catch(error => {
            res.status(400).send('This movie is already marked as favourite')
        })
    } else if (req.query.action === 'unmark') {
        Favourite.destroy({
            where: {
                userId: userId,
                movieId: req.body.movieId
            }
        }).then(result => {
            if (result > 0) {
                res.send('Movie ' + req.body.movieId + ' removed from favourites')
            } else {
                res.status(400).send('This movie was not marked as favourite')
            }
        })
    } else {
        res.status(400).send('Parameter: \'action\' not provided or invalid, should be \'mark\' or \'unmark\'')
    }
})

router.post('/rate', (req, res) => {
    const userId = req.user._id

    if (!validateRating(req, res)) return

    Rating.create({
        userId: userId,
        movieId: req.body.movieId,
        rating: req.body.rating
    }).then(result => {
        res.send('Movie succesfully rated')
    }).catch(error => {
        res.status(400).send('This user has already rated this movie')
    })
})

const validateRating = (req, res) => {
    if (isNaN(req.body.rating) || req.body.rating > 10.0 || req.body.rating < 0.0) {
        res.status(400).send('Invalid rating, should be a number between 0 and 10')
        return false
    }

    return true
}

export default router