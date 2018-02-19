import Block from '../models/Block.model';
import NodeServer from '../domain/Node';
import Transaction from '../models/transaction.model';

class BlocksController {
  /**
   * Get blocks list.
   * @property {number} req.query.skip - Number of blocks to be skipped.
   * @property {number} req.query.limit - Limit number of blocks to be returned.
   * @returns {Block[]}
   */
  async list(req, res) {
    const { limit = 15, skip = 0 } = req.query;
    const blocks = await Block.list({ limit, skip });

    return res.json(blocks);
  }

  /**
   * Get user balance.
   * @returns {Object}
   */
  async getBalance(req, res) {
    const { username } = req.user;
    const blocks = await Block.find({
      $or: [
        { 'transactions.from': { $eq: username } },
        { 'transactions.to': { $eq: username } },
      ],
    })
      .exec();

    let total = blocks.reduce((totalAcc, block) => {
      const blockValue = block.transactions.reduce((blockAcc, transaction) => {
        if (transaction.to === username) {
          return blockAcc + transaction.amount;
        }
        if (transaction.from === username) {
          return blockAcc - transaction.amount;
        }
        return blockAcc;
      }, 0);

      return totalAcc + blockValue;
    }, 0);


    const transactions = await Transaction.find({ from: username }).exec();
    total = transactions.reduce((totalAcc, curr) => totalAcc - curr.amount, total);

    return res.json({ balance: total });
  }
  /**
     * Mine new block
     * @returns {Block}
     */
  async mine(req, res) {
    const newBlock = await NodeServer.mine();

    return res.json(newBlock);
  }
}

export default new BlocksController();
