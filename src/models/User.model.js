import mongoose from 'mongoose';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Methods
 */
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
