const express = require('express');
const router = express.Router();

//connect pgSQL
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

module.exports = router;

router.get('/', async (req, res) => {
    try{
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM account;');
        res.send((result) ? result.rows : null);
    } catch(err) {
        console.log(err);
        res.send("Error " + err);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM account WHERE id=$1::integer;', [req.params.id]);
        res.send((result) ? result.rows : null);
    } catch(err) {
        console.log(err);
        res.send("Error " + err);
    }
});

router.get('/customer/:id', async (req, res) => {
    try{
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM account WHERE customer_id=$1::integer;', [req.params.id]);
        res.send((result) ? result.rows : null);
    } catch(err) {
        console.log(err);
        res.send("Error " + err);
    }
});

router.get('/employee/:id', async (req, res) => {
    try{
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM account WHERE employee_id=$1::integer;', [req.params.id]);
        res.send((result) ? result.rows : null);
    } catch(err) {
        console.log(err);
        res.send("Error " + err);
    }
});