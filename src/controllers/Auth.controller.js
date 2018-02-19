import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import userModel from '../models/User.model';
import transactionModel from '../models/transaction.model';
import config from '../config';
import APIError from '../exceptions/APIError';

export const SALT_ROUND_GEN = 10;

class AuthController {
  /**
   * Returns jwt token if valid username and password is provided
   * @param req
   * @param res
   * @param next
   * @returns {*}
   */
  async login(req, res, next) {
    let user = await userModel.findOne({ name: req.body.username });
    if (!user) {
      const hash = await bcrypt.hash(req.body.password, SALT_ROUND_GEN);

      user = await userModel.create({
        name: req.body.username,
        password: hash,
      });

      transactionModel.create({
        from: 'network',
        to: req.body.username,
        amount: 10,
      });

      return this.responseWIthJwt(user, res);
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);

      return next(err);
    }

    return this.responseWIthJwt(user, res);
  }

  responseWIthJwt(user, res) {
    const token = jwt.sign({ username: user.name }, config.jwtSecret);

    return res.json({
      token,
      username: user.name,
    });
  }
}

const authController = new AuthController();
export default authController;
