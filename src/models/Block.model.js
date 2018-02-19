import mongoose from 'mongoose';
import { TransactionSchema } from './Transaction.model';

const BlockSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  transactions: [TransactionSchema],
  previousHash: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  proofOfWork: {
    type: Number,
    required: true,
  },
});


BlockSchema.method({});

/**
 * Statics
 */
BlockSchema.statics = {
  /**
   * List of blocks in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of blocks to be skipped.
   * @param {number} limit - Limit number of blocks to be returned.
   * @returns {Promise<Block[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

/**
 * @typedef Block
 */
export default mongoose.model('Block', BlockSchema);
