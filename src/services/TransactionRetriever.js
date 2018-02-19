import blockModelInstance from '../models/Block.model';
import transactionModelInstance from '../models/Transaction.model';

class TransactionRetriever {
  constructor(blockModel, transactionModel) {
    this.blockModel = blockModel;
    this.transactionModel = transactionModel;
  }

  async getTransactionsForUser(username) {
    const blocks = await this.blockModel.find({
      $or: [
        { 'transactions.from': { $eq: username } },
        { 'transactions.to': { $eq: username } },
      ],
    }).exec();

    const blockChainTransactions = blocks.reduce((transactionList, block) => {
      const transactions = block.transactions
        .filter(transaction => transaction.to === username || transaction.from === username);

      return transactionList.concat(transactions);
    }, []);

    const pendingTrasactions = await this.transactionModel.find({ from: username }).exec();

    return blockChainTransactions.concat(pendingTrasactions).reverse();
  }
}

const transactionRetriever = new TransactionRetriever(blockModelInstance, transactionModelInstance);
export default transactionRetriever;
