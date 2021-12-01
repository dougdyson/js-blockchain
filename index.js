const { createHash } = require('crypto');

const createBlockHash = (block) => {
  const hash = createHash('sha256');
  hash.update(block);
  return block.hash = hash.digest('hex');
}

const createBlock = (data) => {
  const id        = blockchain.length + 1;
  const timestamp = Date.now();
  const prevHash  = blockchain[blockchain.length - 1].hash 
  const hash      = createBlockHash(id + timestamp + prevHash + data.toString());
  return blockchain.push({id, timestamp, data, hash, prevHash});
}

// create genesis block
const blockchain = [{id: '1', timestamp: Date.now(), data: {description: 'genesis block'}, hash: '', prevHash: 0}];
blockchain[0].hash = createBlockHash(blockchain[0].toString());

// Quokka testing //?
createBlock({description:'second block'}); 
createBlock({description:'third block'});
blockchain[0].hash //?
blockchain[1].prevHash //?