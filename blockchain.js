const { createHmac } = require('crypto');

const blockchain = [];
const difficulty = 1; // for Proof-of-Work

const calculateHash = (data) => createHmac('sha256', 'secret').update(data).digest('hex');

// add a new block
const newBlock = (transaction) => {
  proofOfWork(difficulty);
  const timestamp = Date.now();
  // need to account for genesis block, which does not have a prevHash to reference
  const prevHash  = (blockchain.length === 0) ? null : blockchain[blockchain.length - 1].hash
  const hash      = calculateHash(timestamp + prevHash + transaction);
  const block     = {timestamp, prevHash, hash, transaction};
  return block;
}

// Proof-of-Work
// This is not a real PoW, just a fancy loop using hashing for illustrative purposes
const proofOfWork = (difficulty) => {
  let nonce = 0;
  let hash  = '';
  while (hash.substring(0, difficulty) != Array(difficulty + 1).join('0')) {
    nonce++;
    hash = calculateHash(nonce.toString());
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

// HACK BY CHANGING A TRANSACTION VALUE
const bc3 = blockchain[3];
// comment or uncomment below line to test
// bc3.transaction  = 'hack';
const rehash = calculateHash(bc3.timestamp + bc3.prevHash + bc3.transaction);
// false if hacked, true if not
(bc3.hash === rehash) ? console.log('Clean!') : console.log('HACKED!');
