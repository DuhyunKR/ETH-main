const express = require('express');
const router = express.Router();

//const helloWorldRouter = require('./helloWorld');
const helloWorldRouter = require('./helloShadow');
const myTokenRouter = require('./myTokenShadow');
const votingRouter = require('./voting');

router.use('/hello-world', helloWorldRouter);
router.use('/my-token', myTokenRouter);
router.use('/voting', votingRouter);

router.get('/', function(req, res) {
  res.render('index', { title: 'My first ethereum application'});
});

module.exports = router;
