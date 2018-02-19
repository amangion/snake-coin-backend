import express from 'express';
import expressJwt from 'express-jwt';
import asyncMiddleware from './asyncMiddleware';
import blocksController from '../controllers/Blocks.controller';
import config from '../config';

const router = express.Router();

router.get('/', asyncMiddleware(blocksController.list));
router.post('/mine', asyncMiddleware(blocksController.mine));
router.post('/balance', expressJwt({ secret: config.jwtSecret }), asyncMiddleware(blocksController.getBalance));

export default router;
