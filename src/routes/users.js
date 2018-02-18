import express from 'express';
import expressJwt from 'express-jwt';
import asyncMiddleware from './asyncMiddleware';
import usersController from '../controllers/UsersController';
import config from '../config';

const router = express.Router();

router.get('/balance', expressJwt({ secret: config.jwtSecret }), asyncMiddleware(usersController.getBalance));

export default router;
