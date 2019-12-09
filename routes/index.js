const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
   res.send('Welcome to the root directory for the IT 302 Banking API. For documentation, visit the <a href="https://github.com/jacobkrol/Banking-API/blob/master/README.md" target="_blank">GitHub page</a>.');
});