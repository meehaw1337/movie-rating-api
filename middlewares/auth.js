import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token = req.header(process.env.AUTH_TOKEN)

    if (!token) {
        res.status(401).send('Access denied')
    } else {
        try {
            const verifiedUser = jwt.verify(token, process.env.SECRET)
            req.user = verifiedUser
            next()
        } catch (err) {
            res.status(401).send('Access denied')
        }
    }
}