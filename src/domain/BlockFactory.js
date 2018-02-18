import sha256 from 'sha256';

import BlockModel from '../models/Block.model';

export class BlockFactory {
  constructor(blockModel, hashMethod) {
    this.blockModel = blockModel;
    this.hashMethod = hashMethod;
  }

  async create(params) {
    const hash = this.hashMethod(`${params.index}${params.timestamp}${params.previousHash}`);

    return this.blockModel.create(Object.assign(params, { hash }));
  }
}

const blockFactory = new BlockFactory(BlockModel, sha256);
export default blockFactory;
