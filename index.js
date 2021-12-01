const { createHmac } = require('crypto');

const createBlockHash = (block) =>  createHmac('sha256', 'secret').update(block).digest('hex');

const createBlock = (data) => {
  const id        = blockchain.length + 1;
  const timestamp = Date.now();
  const prevHash  = blockchain[blockchain.length - 1].hash 
  const hash      = createBlockHash(id + timestamp + prevHash + data.toString());
  return blockchain.push({id, timestamp, data, hash, prevHash});
}

const validateBlockchain = (bc) => {
  // start comparison from second block
  for (let i = 1; i < bc.length; i++) {
    
    // recalculated hash must match block's recorded hash
    const block     = bc[i];
    const blockData = block.id + block.timestamp + block.prevHash + block.data.toString;
    if (block.hash != createBlockHash(blockData)) return false;
    
    // confirm previous hash has matches hash on previous block
    if (bc[i].prevHash != bc[i - 1].hash) return false;
  }
  return true;
}

// create genesis block
const blockchain   = [{id: '1', timestamp: Date.now(), data: {description: 'genesis block'}, hash: '', prevHash: 0}];
blockchain[0].hash = createBlockHash(blockchain[0].toString());

// create some blocks
createBlock({description:'second block'}); 
createBlock({description:'third block'});
createBlock({description:'fourth block'});

// validate blockchain integrity
validateBlockchain(blockchain); //?

// Testing via Quokka in-line IDE evaluation: //?
blockchain[0].hash     //?
blockchain[1].prevHash //?
blockchain[1].hash     //?
blockchain[2].prevHash //?
blockchain[2].hash     //?
blockchain[3].prevHash //?