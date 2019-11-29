const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

//read in environment variables from .env
const dotenv = require('dotenv');
dotenv.config();

//allow external calls
app.use((req,res,next) => {
   res.header('Access-Control-Allow-Origin', '*');
   next();
});

//set the routes
const index = require('./routes/index');
const login = require('./routes/login');
const customers = require('./routes/customers');
const accounts = require('./routes/accounts');
const positions = require('./routes/positions');
const transactions = require('./routes/transactions');
const securities = require('./routes/securities');
const employees = require('./routes/employees');

//define route paths
app.use('/', index);
app.use('/login', login);
app.use('/customers', customers);
app.use('/accounts', accounts);
app.use('/positions', positions);
app.use('/transactions', transactions);
app.use('/securities', securities);
app.use('/employees', employees);

//log active port
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
