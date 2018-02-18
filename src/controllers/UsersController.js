import userModel from '../models/User.model';

class UsersController {
  async getBalance(req, res, next) {
    const user = await userModel.findOne({ name: req.user.username });

    return res.json({ balance: user.balance });
  }
}

const usersController = new UsersController();
export default usersController;
