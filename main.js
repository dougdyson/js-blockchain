const { createHmac } = require('crypto');

const calculateBlockHash = (block) => createHmac('sha256', 'secret').update(block).digest('hex');

const createBlock = (data) => {
  const id        = blockchain.length + 1;
  const timestamp = Date.now();
  const prevHash  = blockchain[blockchain.length - 1].hash || 0
  const nonce     = Math.random();
  const hash      = calculateBlockHash(id + timestamp + prevHash + data.toString() + nonce);
  return blockchain.push({id, timestamp, data, hash, prevHash, nonce});
}

const validateBlockchain = (bc) => {
  // start comparison from second block
  for (let i = 1; i < bc.length; i++) {
    
    // recalculated hash must match current block's recorded hash
    const currentBlock = bc[i].id + bc[i].timestamp + bc[i].prevHash + bc[i].data.toString() + bc[i].nonce;
    if (bc[i].hash != calculateBlockHash(currentBlock)) return false;

    // current block's previous hash must match hash on previous block
    if (bc[i].prevHash != bc[i - 1].hash) return false;
  }

  return true;
}

// create blockchain with genesis block
const blockchain   = [{id: '1', timestamp: Date.now(), data: {description: 'genesis block'}, hash: '', prevHash: 0}];
blockchain[0].hash = calculateBlockHash(blockchain[0].toString());

// create some blocks with JSON data
createBlock({description:'second block'}); 
createBlock({description:'third block'});
createBlock({description:'fourth block'});

// Testing via Quokka in-line IDE evaluation: //?
// validate blockchain integrity
validateBlockchain(blockchain) //?
blockchain[0].hash     //?
blockchain[1].prevHash //?
blockchain[1].hash     //?
blockchain[2].prevHash //?
blockchain[2].hash     //?
blockchain[3].prevHash //?