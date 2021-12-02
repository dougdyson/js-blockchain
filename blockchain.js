const { createHmac } = require('crypto');

const blockchain = [];
const difficulty = 1; // for Proof-of-Work

const calculateHash = (data) => createHmac('sha256', 'secret').update(data).digest('hex');

// add a new block
const newBlock = (data) => {
  proofOfWork(difficulty);
  const id        = blockchain.length + 1;
  const timestamp = Date.now();
  // need to account for genesis block, which does not have a prevHash to reference
  const prevHash  = (blockchain.length === 0) ? null : blockchain[blockchain.length - 1].hash
  const nonce     = Math.floor(Math.random() * timestamp)
  const hash      = calculateHash(id + timestamp + prevHash + nonce + data);
  console.log(`Block added! data: ${data}, Hash: ${hash}`);
  return {id, timestamp, prevHash, nonce, hash, data}
}

// Proof-of-Work
const proofOfWork = (difficulty) => {
  let nonce = 0;
  let hash = calculateHash(nonce.toString())
  while (hash.substring(0, difficulty) != Array(difficulty + 1).join('0')) {
    nonce++;
    hash = calculateHash(nonce.toString()) //?
  }
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

bc.data  = 'hack';
const rehash = calculateHash(bc.id + bc.timestamp + bc.prevHash + bc.nonce + bc.data); //?

// false if hacked, true if not
(bc.hash === rehash) ? true : false; //?
