import sinon from 'sinon';
import chai, { assert, expect } from 'chai';
import chaiJsonSchema from 'chai-json-schema';
import mongoose from 'mongoose';
import request from 'supertest';

global.chai = chai;
global.assert = assert;
global.expect = expect;
global.sinon = sinon;
global.mongoose = mongoose;
global.request = request;

chai.use(chaiJsonSchema);

chai.config.includeStack = true;
