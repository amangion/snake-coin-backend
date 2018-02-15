import express from 'express';
import asyncMiddleware from './asyncMiddleware';
import transactionsController from '../controllers/TransactionsController';

const router = express.Router();

router.get('/', asyncMiddleware(transactionsController.list));
router.post('/', asyncMiddleware(transactionsController.create));

export default router;
