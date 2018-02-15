import debugModule from 'debug';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import util from 'util';
import config from './config';

const debug = debugModule('snake-coin:index');

mongoose.Promise = Promise;

const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}
