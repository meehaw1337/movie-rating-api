import express from 'express'
import axios from 'axios'

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
        res.status(500).send(error)})
})

export default router