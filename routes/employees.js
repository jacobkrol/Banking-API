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
        let text = 'SELECT * FROM employee WHERE 1=1';
        let qParams = [];
        let invalid = false;
        for(let q in req.query) {
            switch(q) {
                case 'first_name':
                    text += ' AND UPPER(first_name)=$1';
                    qParams.push(req.query[q].toUpperCase());
                    break;
                case 'last_name':
                    text += ' AND UPPER(last_name)=$'+String(qParams.length+1);
                    qParams.push(req.query[q].toUpperCase());
                    break;
                default:
                    res.send('Invalid column key');
                    invalid = true;
                    break;
            }
        }
        if(!invalid) {
            const client = await pool.connect();
            const result = await client.query(text, qParams);
            res.send(result ? result.rows : null);
        }
    } catch(err) {
        console.log(err);
        res.send("Error " + err);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM employee WHERE id=$1::integer;',[req.params.id]);
        res.send((result) ? result.rows : null);
    } catch(err) {
        console.log(err);
        res.send('Error ' + err);
    }
})