const { createHmac } = require('crypto');

const blockchain = [];

const calculateHash = (data) => createHmac('sha256', 'secret').update(data).digest('hex');

const createBlock = (data) => {  
  const id        = blockchain.length + 1;
  const timestamp = Date.now();
  // genesis block doesn't have access to a prevHash so need to provide a value
  const prevHash  = (blockchain.length === 0) ? null : blockchain[blockchain.length - 1].hash
  const nonce     = Math.floor(Math.random() * timestamp);
  const hash      = calculateHash(id + timestamp + prevHash + nonce + data.toString());
  return blockchain.push({id, timestamp, hash, prevHash, nonce, data});
}

const validateBlockchain = (blockchain) => {
  // start comparison from second block
  for (let i = 1; i < blockchain.length; i++) {
    const block = blockchain[i];
    
    // recalculated hash must match current block's recorded hash
    const currentBlock = block.id + block.timestamp + block.prevHash + block.nonce + block.data.toString();
    if (block.hash != calculateHash(currentBlock)) return false;

    // current block's previous hash must match hash on previous block
    if (block.prevHash != blockchain[i - 1].hash) return false;
  }
  return true;
}


// ===============================================
// create some blocks with JSON data
createBlock({description:'genesis block'})
createBlock({description:'second block'}); 
createBlock({description:'third block'});
createBlock({description:'fourth block'});

//================================================
// Testing via Quokka in-line IDE evaluation: //?
validateBlockchain(blockchain) //?
blockchain[0].hash     //?
blockchain[1].prevHash //?
blockchain[1].hash     //?
blockchain[2].prevHash //?
blockchain[2].hash     //?
blockchain[3].prevHash //?

// hack data on the blockchain
blockchain[2].data.description; //?
blockchain[2].data.description = 'hack'
blockchain[2] //?
validateBlockchain(blockchain) //?
