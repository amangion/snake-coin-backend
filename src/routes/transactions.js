import express from 'express';
import expressJwt from 'express-jwt';
import asyncMiddleware from './asyncMiddleware';
import transactionsController from '../controllers/TransactionsController';
import config from '../config';

const router = express.Router();

router.get('/', expressJwt({ secret: config.jwtSecret }), asyncMiddleware(transactionsController.list));
router.post('/', expressJwt({ secret: config.jwtSecret }), asyncMiddleware(transactionsController.create));

export default router;
