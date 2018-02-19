import express from 'express';
import transactions from './transactions';
import blocks from './blocks';
import auth from './auth';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ api: 'v0.0.1' });
});

router.use('/api/blocks', blocks);
router.use('/api/transactions', transactions);
router.use('/api/auth', auth);

export default router;
