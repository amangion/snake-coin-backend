import blockModelInstance from '../models/Block.model';
import transactionModelInstance from '../models/Transaction.model';

class BalanceService {
  constructor(blockModel, transactionModel) {
    this.blockModel = blockModel;
    this.transactionModel = transactionModel;
  }

  async getCurrentBalanceForUser(username) {
    const blocks = await this.blockModel.find({
      $or: [
        { 'transactions.from': { $eq: username } },
        { 'transactions.to': { $eq: username } },
      ],
    })
      .exec();

    const total = blocks.reduce((totalAcc, block) => {
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


    const transactions = await this.transactionModel.find({ from: username }).exec();

    return transactions.reduce((totalAcc, curr) => totalAcc - curr.amount, total);
  }
}

const balanceService = new BalanceService(blockModelInstance, transactionModelInstance);
export default balanceService;
