const { createHmac } = require('crypto');

const blockchain = [];
const difficulty = 1; // for Proof-of-Work

const calculateHash = (transaction) => createHmac('sha256', 'secret').update(transaction).digest('hex');

// add a new block
const newBlock = (transaction) => {
  const timestamp = Date.now();
  // need to account for genesis block, which does not have a prevHash to reference
  const prevHash  = (blockchain.length === 0) ? null : blockchain[blockchain.length - 1].hash
  const nonce     = 0
  const hash      = calculateHash(timestamp + prevHash + nonce + transaction);
  const block     = {timestamp, prevHash, nonce, hash, transaction}
  proofOfWork(block);
  return block;
}

// Proof-of-Work
// This is not a real PoW, just a fancy delay using hashing for illustrate purposes
const proofOfWork = (block) => {
  while (block.hash.substring(0, difficulty) != Array(difficulty + 1).join('0')) {
    block.nonce++;
    block.hash = calculateHash(block.nonce.toString());
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
const bc2 = blockchain[2];
bc2.hash; //?
bc2.transaction  = 'hack';
const rehash = calculateHash(bc2.timestamp + bc2.prevHash + bc2.nonce + bc2.transaction);
// false if hacked, true if not
(bc2.hash === rehash) ? true : false; //?
