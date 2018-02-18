import mongoose from 'mongoose';
import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../index';
import transactionSchema from './json-schemes/transaction.schema.json';
import transactionListSchema from './json-schemes/transaction-list.schema.json';

chai.config.includeStack = true;

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

describe('## transactions APIs', () => {
  describe('# POST /api/transactions', () => {
    it('should create a new transaction', async () => {
      const transaction = {
        from: 'me',
        to: 'friend',
        amount: 5,
      };

      const res = await request(app)
        .post('/api/transactions')
        .send(transaction)
        .expect(httpStatus.OK);

      assert.jsonSchema(res.body, transactionSchema);
    });
  });

  describe('# GET /api/transactions', () => {
    it('should get all transactions', async () => {
      const res = await request(app)
        .get('/api/transactions')
        .expect(httpStatus.OK);

      chai.tv4.addSchema('http://example.com/transaction.json', transactionSchema);
      assert.jsonSchema(res.body, transactionListSchema);
    });
  });
});
