import blockModelInstance from '../models/Block.model';
import transactionModelInstance from '../models/transaction.model';
import blockFactoryInstance from './BlockFactory';

export const MINER_ADDRESS = 'q3nf394hjg-random-miner-address-34nf3i4nflkn3oi';

export class Node {
  constructor(blockModel, transactionModel, blockFactory) {
    this.minerAddress = MINER_ADDRESS;
    this.blockModel = blockModel;
    this.transactionModel = transactionModel;
    this.blockFactory = blockFactory;
  }

  async mine() {
    const lastBlock = await this.getLastBlock();

    const proofOfWork = this.proofOfWork(lastBlock.proofOfWork);

    const transactions = await this.transactionModel.find();
    const transaction = await this.transactionModel.create({ from: 'network', to: this.minerAddress, amount: 1 });

    const newBlock = await this.blockFactory.create({
      index: lastBlock.index + 1,
      timestamp: Date.now(),
      transactions: [transaction, ...transactions],
      previousHash: lastBlock.hash,
      proofOfWork,
    });

    await this.transactionModel.remove({});

    return newBlock;
  }

  async getLastBlock() {
    return await this.blockModel.findOne({}, {}, { sort: { timestamp: -1 } }) || this.createGenesisBlock();
  }

  async createGenesisBlock() {
    return this.blockFactory.create({
      index: 1,
      timestamp: Date.now(),
      transactions: [],
      previousHash: '#',
      proofOfWork: 9,
    });
  }

  proofOfWork(lastProof) {
    let nonce = lastProof + 1;
    while (!(nonce % 9 === 0 && nonce % lastProof === 0)) {
      nonce += 1;
    }

    return nonce;
  }
}

const node = new Node(blockModelInstance, transactionModelInstance, blockFactoryInstance);
export default node;
