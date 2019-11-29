const express = require('express');
const cors = require('cors');
const router = express.Router();

module.exports = router;

router.options('/post', cors())

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//set up google authentication
const CLIENT_ID = "462661554970-9q1v51856hd725jc1qe8bg5oqc5c45k5.apps.googleusercontent.com";
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  
  return payload;
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
}
// verify().catch(console.error);

router.post('/post', async function (req, res, next) {
    
//   res.send(req.body);  
// //   console.log('req.body:',req);
  let validationResponse = await verify(req.body.idToken);
  res.json(validationResponse);
});