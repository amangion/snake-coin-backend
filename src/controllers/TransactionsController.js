import Transaction from '../models/transaction.model';
import transactionRetriever from '../services/TransactionRetriever';
import balanceService from '../services/BalanceService';

/**
 * @swagger
 * tags:
 *   - name: "Transactions"
 *     description: "User transactions"
 */
class TransactionsController {
  /**
   * @swagger
   * /api/transactions:
   *   post:
   *     tags:
   *      - "Transactions"
   *     description: Create new transaction
   *     produces:
   *      - application/json
   *     parameters:
   *      - name: from
   *        description: The sender of transaction
   *        in: "body"
   *        type: String
   *        required: true
   *      - name: to
   *        description: The recipient of transaction
   *        in: "body"
   *        type: String
   *        required: true
   *      - name: amount
   *        description: The amount of coins
   *        in: "body"
   *        type: Number
   *        required: true
   *     responses:
   *       200:
   *         description: Created transaction
   *         schema:
   *           $ref: '#/definitions/Transaction'
   */
  async create(req, res) {
    const transaction = await Transaction.create({
      from: req.body.from || req.user.username,
      to: req.body.to,
      amount: req.body.amount,
    });

    return res.json(transaction);
  }

  /**
     * @swagger
     * definitions:
     *   Transaction:
     *     type: object
     *     required:
     *       - from
     *       - to
     *       - ampount
     *     properties:
     *       from:
     *         type: string
     *       to:
     *         type: string
     *       ampount:
     *         type: number
     *
     */

  /**
     * @swagger
     * /api/transactions:
     *   get:
     *     tags:
     *      - "Transactions"
     *     description: Get transaction list
     *     produces:
     *      - application/json
     *     parameters:
     *      - name: skip
     *        description: Offset value for getting records
     *        in: "query"
     *        type: Number
     *        required: false
     *      - name: limit
     *        description: Count of records to receive
     *        in: "query"
     *        type: Number
     *        required: false
     *     responses:
     *       200:
     *         description: transaction
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/Transaction'
     */
  async getTransactionsList(req, res) {
    const { username } = req.user;

    res.json(await transactionRetriever.getTransactionsForUser(username));
  }

  /**
   * Get user balance.
   * @returns {Object}
   */
  async getBalance(req, res) {
    const { username } = req.user;

    return res.json({ balance: await balanceService.getCurrentBalanceForUser(username) });
  }
}

export default new TransactionsController();
