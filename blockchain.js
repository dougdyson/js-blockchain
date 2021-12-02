const { createHmac } = require('crypto');

const blockchain = [];

const calculateHash = (data) => createHmac('sha256', 'secret').update(data).digest('hex');

// add a new block
const newBlock = (data) => {
  const id        = blockchain.length - 1;
  const timestamp = Date.now();
  // need to account for genesis block, which does not have a prevHash to reference
  const prevHash  = (blockchain.length === 0) ? null : blockchain[blockchain.length - 1].hash
  const nonce     = Math.floor(Math.random() * timestamp)
  const hash      = calculateHash(id + timestamp + prevHash + nonce + data);
  return {id, timestamp, prevHash, nonce, hash, data}
}

// create genesis block
blockchain.push(newBlock('genesis block'));

// create some more blocks
blockchain.push(newBlock('second block'));
blockchain.push(newBlock('third block'));
blockchain.push(newBlock('fourth block'));


// =============================================
// TESTING
// =============================================
const bc = blockchain[1];
bc.data //?
bc.data  = 'hack';

const hack = calculateHash(bc.id + bc.timestamp + bc.prevHash + bc.nonce + bc.data); //?

(bc.hash === hack) ? true : false //?