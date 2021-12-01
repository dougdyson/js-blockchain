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

const validateBlockchain = () => {
  // start comparison from second block
  for (let i = 1; i < blockchain.length; i++) {
    if (blockchain[i].prevHash != blockchain[i - 1].hash) return false
  }
  return true;
}

// create genesis block
const blockchain   = [{id: '1', timestamp: Date.now(), data: {description: 'genesis block'}, hash: '', prevHash: 0}];
blockchain[0].hash = createBlockHash(blockchain[0].toString());

// create some blocks
createBlock({description:'second block'}); 
createBlock({description:'third block'});

// validate blockchain integrity
validateBlockchain(); //?

// Testing via Quokka in-line IDE evaluation: //?
blockchain[0].hash     //?
blockchain[1].prevHash //?
blockchain[1].hash     //?
blockchain[2].prevHash //?
