const express = require('express');
const pool = require('../db/postgre');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router  = express.Router();
const secretKey = 'MY_SECRET_KEY';
const createPdf = require('../pdf/pdf-generator');

router.post('/signup', async (req, res) => {
    const {userName, email, password} = req.body;
    if (!userName || !email || !password) {
        return res.status(422).send({error: 'Must provide user name, email and password'});
    }
    try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id', [userName, email, hash]);
    const userId = result.rows[0].id;
    const token = await jwt.sign({userId}, secretKey)
    res.send({token});
    }
    catch (error) {
        res.status(402).send({error})
    }
});

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    try{
        if (!email || !password) {
            throw ({error: 'Must provide email and password'});
        }
        const result = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
        const user = result.rows[0];
        if (!user) {
            throw({error: 'Invalid password or email'});
        }

        const isMatch = await bcrypt.compare(password, user.password,);
        if(!isMatch) {
            throw ({error: 'Invalid password or email'});
        }
        else {
            const token = await jwt.sign({userId: user.id}, secretKey);
            res.send({username: user.username, token});
        } 
    } catch (error) {
    return res.status(402).send(error);
    }
});

router.post('/signinwithbarcode', async (req, res) => {
    const {barcode} = req.body;
    try{
        if (!barcode) {
            throw ({error: 'Must provide barcode'});
        }
        const result = await pool.query('SELECT * FROM devices WHERE barcode = $1 LIMIT 1', [barcode]);
        const device = result.rows[0];
        if (!device) {
            throw({error: 'Invalid barcode'});
        }
        else {
            const token = await jwt.sign({deviceId: device.id}, secretKey);
            return res.send({
                token,
                userName: device.username});
        } 
    } catch (error) {
    return res.status(402).send(error);
    }
});


router.post('/checkToken', async (req, res) => {
    try {
        const {userId} = await jwt.verify(req.body.token, secretKey);
        const result = await pool.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [userId]);
        const user = result.rows[0];
        if (!user) {
            throw({error: 'Invalid token'});
        } 
        else {
            return res.send({
                userName: user.username,
                userId: user.id});
        }
    } catch(error) {
        return res.status(402).send(error);
    }
});

router.post('/addRun', async (req, res) => {
    try {
        const {userId, run, options:{child, type}, timestamp} = req.body;
        const result = await pool.query(
            'INSERT INTO runs (userId, run, child, type, timestamp) VALUES ($1, $2, $3, $4, to_timestamp($5))', 
            [userId, run, child, type, timestamp / 1000.0]
        );
        return res.send({
            errorMessage: "OK"
        });
    } catch(error){
        console.log('err : ' + error);
        return res.status(402).send(error);
    }
});

router.get('/getRunList', async (req, res) => {
    try {
        const { userId } = req.query;
        const result = await pool.query('SELECT * FROM runs WHERE userId = $1',[userId]);
        runList = result.rows;
        return res.send({
            runList
        });
    } catch(error) {
        console.log('err : ' + error);
        return res.status(402).send(error);
    }
});

router.get('/pdf', async (req, res) => {
    try{
        createPdf();
        res.status(200).send();
    } catch(err) {
        res.status(500).send();
    }
});

module.exports = router;