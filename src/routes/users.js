import express from 'express';
import asyncMiddleware from './asyncMiddleware';
import userControllers from '../controllers/UsersController';

const router = express.Router();

router.get('/', asyncMiddleware(userControllers.get));

export default router;
