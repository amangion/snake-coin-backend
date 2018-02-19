import express from 'express';
import asyncMiddleware from './asyncMiddleware';
import blocksController from '../controllers/Blocks.controller';

const router = express.Router();

router.get('/', asyncMiddleware(blocksController.list));
router.post('/mine', asyncMiddleware(blocksController.mine));

export default router;
