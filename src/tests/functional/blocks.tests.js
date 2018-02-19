import mongoose from 'mongoose';
import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../index';
import blockSchema from './json-schemes/block.schema.json';
import transactionSchema from './json-schemes/transaction.schema.json';
import blockListSchema from './json-schemes/block-list.schema.json';


/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## blocks APIs', () => {
  describe('# GET /api/blocks/mine', () => {
    it('should mine a new block', async () => {
      const res = await request(app)
        .post('/api/blocks/mine')
        .send()
        .expect(httpStatus.OK);

      chai.tv4.addSchema('http://example.com/transaction.json', transactionSchema);
      assert.jsonSchema(res.body, blockSchema);
    });
  });

  describe('# GET /api/blocks', () => {
    it('should get all blocks', async () => {
      const res = await request(app)
        .get('/api/blocks')
        .expect(httpStatus.OK);

      chai.tv4.addSchema('http://example.com/block.json', blockSchema);
      assert.jsonSchema(res.body, blockListSchema);
    });
  });
});
