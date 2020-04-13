import express from 'express'
import axios from 'axios'
import Favourite from '../models/favourite.js'
import Rating from '../models/rating.js'

const router = express.Router()

const OMDB_API_URL = 'http://www.omdbapi.com/'

router.get('/search', async (req, res) => {
    console.log(new Date().toLocaleString() + '  Request received: GET at /movies/search')

    const userId = req.user._id
    const title = req.query.title

    if (title === undefined) {
        res.status(400).send('Missing required parameter: title')
    }

    try {
        const axiosResponse = await axios.get(OMDB_API_URL, {
            params: {
                t: title,
                r: 'json',
                apikey: process.env.OMDB_API_KEY
            }
        })

        res.send({
            Title: axiosResponse.data.Title,
            Year: axiosResponse.data.Year,
            Genre: axiosResponse.data.Genre,
            imdbID: axiosResponse.data.imdbID,
            UserRating: await userRating(userId, axiosResponse.data.imdbID),
            AverageRating: await averageRating(axiosResponse.data.imdbID),
            Favourite: await isFavourite(userId, axiosResponse.data.imdbID)
        })

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/favourite', (req, res) => {
    console.log(new Date().toLocaleString() + '  Request received: POST at /movies/favourite')

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
            res.send('Movie added to favourites')
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
                res.send('Movie removed from favourites')
            } else {
                res.status(400).send('This movie was not marked as favourite')
            }
        })
    } else {
        res.status(400).send('Parameter: \'action\' not provided or invalid, should be \'mark\' or \'unmark\'')
    }
})

router.post('/rate', (req, res) => {
    console.log(new Date().toLocaleString() + '  Request received: POST at /movies/rate')

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

const averageRating = async (movieId) => {
    /* Sequelize ORM doesn't provide AVG function */
    const ratingSum = await Rating.sum('rating', {
        where: {
            movieId
        }
    })

    const ratingCount = await Rating.count({
        where: {
            movieId
        }
    })

    if (ratingCount === 0) {
        return 'not rated yet'
    }

    return ratingSum / ratingCount
}

const userRating = async (userId, movieId) => {
    const userRating = await Rating.findOne({
        where: {
            movieId,
            userId
        }
    })

    if (userRating === null) {
        return 'not rated yet'
    } else {
        return userRating.rating
    }
}

const isFavourite = async (userId, movieId) => {
    const count = await Favourite.count({
        where: {
            movieId,
            userId
        }
    })

    if (count === 1) {
        return true
    } else {
        return false
    }
}

export default router