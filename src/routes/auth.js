import express from 'express';
import validate from 'express-validation';
import asyncMiddleware from './asyncMiddleware';
import authController from '../controllers/Auth.controller';
import loginParams from './validators/auth';

const router = express.Router();

router.route('/login').post(validate(loginParams), (req, res, next) =>
  asyncMiddleware(authController.login(req, res, next)));

export default router;
