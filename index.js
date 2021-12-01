const { createHash } = require('crypto');

const blockchain = [{id: '1', timestamp: Date.now(), data: [{description: 'genesis block'}], hash: '', prevHash: 0}];

const createBlockHash = (block) => {
  const hash = createHash('sha256');
  hash.update(blockHash);
  return block.hash = hash.digest('hex');
}

const createBlock = (data) => {
  const id        = blockchain.length; //?
  const timestamp = Date.now();
  const prevHash  = blockchain[blockchain.length - 1].hash //?
  const blockHash = id + timestamp + prevHash + data.toString();
  const hash      = createBlockHash(blockHash);
  return blockchain.push({id, timestamp, data, hash, prevHash});
}

createBlock('second block'); //?

blockchain[1]//?