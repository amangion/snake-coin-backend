const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ api: 'v0.0.1' });
});

module.exports = router;
