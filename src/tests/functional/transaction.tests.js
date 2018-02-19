/* eslint max-len: 0 */
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


const AUTH_HEADR = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFtYW5nZSIsImlhdCI6MTUxODk5MjQyMX0.pB2m_hfKCqFO5mg6PWNF7vbxWDfn0oXNmurF6kTxZ84';


describe('## transactions APIs', () => {
  describe('# POST /api/transactions', () => {
    it('should create a new transaction', async () => {
      const transaction = {
        to: 'friend',
        amount: 5,
      };

      const res = await request(app)
        .post('/api/transactions')
        .set('Authorization', AUTH_HEADR)
        .send(transaction)
        .expect(httpStatus.OK);

      assert.jsonSchema(res.body, transactionSchema);
    });
  });

  describe('# GET /api/transactions', () => {
    it('should get all transactions', async () => {
      const res = await request(app)
        .get('/api/transactions')
        .set('Authorization', AUTH_HEADR)
        .expect(httpStatus.OK);

      chai.tv4.addSchema('http://example.com/transaction.json', transactionSchema);
      assert.jsonSchema(res.body, transactionListSchema);
    });
  });
});
