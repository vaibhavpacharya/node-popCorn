const express = require('express');

const router = express.Router();
const moment = require('moment');
const request = require('request');
const bodyParser = require('body-parser');

router.get('/', async (req, res, next) => {
  try {
    res.render('index/landing');
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
