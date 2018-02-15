var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({"api": "v0.0.1"})
});

module.exports = router;
