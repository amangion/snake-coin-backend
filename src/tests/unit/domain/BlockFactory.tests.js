import { BlockFactory } from '../../../domain/BlockFactory';

describe('## BlockFactory unit test', () => {
  describe('# create(params) method', () => {
    it('should create a new transaction', async () => {
      const params = {
        index: 3,
        timestamp: Date.now(),
        previousHash: '#lastBlock-hash',
      };

      const hash = `${params.index}${params.timestamp}${params.previousHash}`;
      const hashedValue = '###hash';

      const newBlock = { index: params.index };

      const blockModel = {
        create: sinon.stub().withArgs(Object.assign(params, { hash: hashedValue })).resolves(newBlock),
      };

      const hashFunction = sinon.stub().withArgs(hash).returns('hash');

      const blockFactory = new BlockFactory(blockModel, hashFunction);
      const result = await blockFactory.create(params);

      assert.equal(result.index, params.index);
    });
  });
});
