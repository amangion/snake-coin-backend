const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json([{ name: 'John Joe' }]);
});

module.exports = router;
