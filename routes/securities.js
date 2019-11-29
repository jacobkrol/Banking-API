const express = require('express');
const router = express.Router();

//connect pgSQL
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

//load body parser
router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

module.exports = router;

router.get('/', async (req, res) => {
    try{
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM asset;');
        res.send((result) ? result.rows : null);
    } catch(err) {
        console.log(err);
        res.send("Error " + err);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM asset WHERE id=$1::integer;', [req.params.id]);
        res.send((result) ? result.rows : null);
    } catch(err) {
        console.log(err);
        res.send("Error " + err);
    }
});

router.get('/:id/price', async (req, res) => {
   try {
       const client = await pool.connect();
       const result = await client.query('SELECT symbol FROM asset WHERE id=$1::integer;', [req.params.id]);
       const symbol = (result) ? result.rows[0].symbol : null;
       const request = require('request');
       request('https://api.worldtradingdata.com/api/v1/stock?symbol='+symbol+'&api_token=uyMOhtXtguoVMs6ItHt0hViPlObXZngmYGniZYo9gQ4ditDKc1al2H6zak3w', (err, response, body) => {
           if(err) {
               console.log('Error:',err);
           } else {
               res.send(JSON.parse(body).data);
           }
       });
   } catch(err) {
       console.log(err);
       res.send("Error " + err);
   }
});