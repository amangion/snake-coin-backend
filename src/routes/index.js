import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ api: 'v0.0.1' });
});

export default router;
