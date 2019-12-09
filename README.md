# IT 302 Banking API

This is a RESTful API built using [Express 4](http://expressjs.com/) on Node.js v13. It was created on top of the existing [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article.

**Project Dates:** Fall 2019

## Documentation

`/` returns documentation page

`/customers` returns all customers

`/customers/<id>` returns the customer with the ID \<id\>

`/accounts` returns all accounts

`/accounts/<id>` returns the account with the ID \<id\>

`/accounts/customer/<id>` returns all accounts under customer with the ID \<id\>

`/accounts/employee/<id>` returns all accounts under employee with the ID \<id\>

`/positions/<id>` returns the position with the ID \<id\>

`/positions/customer/<id>` returns all positions under customer with the ID \<id\>

`/transactions/account/<id>` returns all transactions under account with the ID \<id\>

`/securities` returns all securities

`/securities/<id>` returns the security with the ID \<id\>

`/securities/<id>/price` returns current information on security with the ID from third party request

`/employees` returns all employees

`/employees/<id>` returns the employee with the ID \<id\>
