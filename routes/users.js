var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json([{"name": "John Joe"}]);
});

module.exports = router;
