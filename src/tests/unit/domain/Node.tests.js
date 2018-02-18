import { Node } from '../../../domain/Node';

describe('## Node unit test', () => {
  describe('# mine() method', () => {
    it('should mine new block', async () => {
      const lastBlock = {
        index: 1,
        hash: 'test-hash-last',
        proofOfWork: 9,
      };

      const newBlock = {
        index: 2,
        hash: 'test-hash-new',
        previousHash: lastBlock.hash,
        proofOfWork: 18,
      };

      const transaction = { from: 'network', to: 'miner-addres', amount: 1 };

      const blockModel = {
        findOne: sinon.stub().withArgs({}, {}, { sort: { timestamp: -1 } }).resolves(lastBlock),
      };

      const transactionModel = {
        find: sinon.stub().withArgs().resolves([]),
        create: sinon.stub().withArgs(transaction).resolves(transaction),
        remove: sinon.spy(),
      };

      const blockFactory = {
        create: sinon.stub().withArgs().resolves(newBlock),
      };

      const nodeInstance = new Node(blockModel, transactionModel, blockFactory);

      const minedBlock = await nodeInstance.mine();

      assert.equal(minedBlock.index, newBlock.index);
      assert.equal(minedBlock.previousHash, lastBlock.hash);
      assert.equal(minedBlock.proofOfWork, newBlock.proofOfWork);

      assert.isTrue(transactionModel.remove.called);
    });
  });
});

