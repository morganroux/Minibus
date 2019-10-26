const jwt = require('jsonwebtoken');
const pool = require('../db/postgre');

module.exports = async (req, res, next) => {
    try {
        const {authorization} = req.headers;
        //authorization === 'Bearer lijghdoiugzedihoidjmojef'
        if (!authorization){
            throw ('You must be logged in');
        }
        const token = authorization.replace('Bearer ', '');
        const {userId} = await jwt.verify(token, 'MY_SECRET_KEY');
        const result = await pool.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [userId]);
        user = result.rows[0];
        if (!user) {
            throw ('Invalid Token');
        }
        req.user = user;
        next();
    } catch(error) {
        res.status(402).send({error});
    }
}