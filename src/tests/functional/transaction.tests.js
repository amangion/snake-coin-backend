import mongoose from 'mongoose';
import request from 'supertest';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

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

      expect(res.body.from).to.equal(transaction.from);
      expect(res.body.to).to.equal(transaction.to);
      expect(res.body.amount).to.equal(transaction.amount);
    });
  });

  describe('# GET /api/transactions', () => {
    it('should get all transactions', async () => {
      const res = await request(app)
        .get('/api/transactions')
        .expect(httpStatus.OK);

      expect(res.body).to.be.an('array');
    });
  });
});
