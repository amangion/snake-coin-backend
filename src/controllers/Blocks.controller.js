import Block from '../models/Block.model';
import NodeServer from '../domain/Node';

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
     * Mine new block
     * @returns {Block}
     */
  async mine(req, res) {
    const newBlock = await NodeServer.mine();

    return res.json(newBlock);
  }
}

export default new BlocksController();
