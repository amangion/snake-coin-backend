import Block from '../models/Block.model';
import NodeServer from '../domain/Node';
import balanceService from '../services/BalanceService';

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

    return res.json({ balance: await balanceService.getCurrentBalanceForUser(username) });
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
