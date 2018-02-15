import Transaction from '../models/transaction.model';

class UsersController {
  /**
   * Create new Transaction
   * @property {string} req.body.from - The sender of transaction.
   * @property {string} req.body.to - The recipient of transaction.
   * @property {string} req.body.amount - The amount of coins.
   * @returns {Transaction}
   */
  async create(req, res) {
    const transaction = new Transaction({
      from: req.body.from,
      to: req.body.to,
      amount: req.body.amount,
    });

    const savedTransaction = await transaction.save();
    return res.json(savedTransaction);
  }

  /**
   * Get transaction list.
   * @property {number} req.query.skip - Number of transactions to be skipped.
   * @property {number} req.query.limit - Limit number of transactions to be returned.
   * @returns {Transaction[]}
   */
  async list(req, res) {
    const { limit = 15, skip = 0 } = req.query;
    const transactions = await Transaction.list({ limit, skip });

    return res.json(transactions);
  }
}

export default new UsersController();
