const { createHmac } = require('crypto');

const blockchain = [];
let difficulty = 1; // for Proof-of-Work

const calculateHash = (data) => createHmac('sha256', 'secret').update(data).digest('hex');

const addBlock = (transaction) => {
  proofOfWork(difficulty); 
  const timestamp = Date.now();
  // need to account for genesis block, which does not have a prevHash to reference
  const prevHash  = (blockchain.length === 0) ? null : blockchain[blockchain.length - 1].hash
  const hash      = calculateHash(timestamp + prevHash + transaction);
  const block     = {timestamp, prevHash, hash, transaction};
  return block;
}

// Proof-of-Work
// This is not a real PoW, just a loop using hashing for illustrative purposes
// Was first rehashing block while incrementing its nonce but it was SO SLOW!!
// (p.s. PoW is essentially a transaction throttle)
const proofOfWork = (difficulty) => {
  let nonce = 0;
  let hash  = '';
  while (hash.substring(0, difficulty) != Array(difficulty + 1).join('0')) {
    nonce++;
    hash = calculateHash(nonce.toString());
  }
}

const newBlockchain = (d) => {
  const blockchain = [];
  // set PoW difficulty
  difficulty = d;
  // create genesis block 
  const timestamp   = Date.now();
  const prevHash    = '';
  const transaction = 'genesis block';
  const hash        = calculateHash(timestamp + prevHash + transaction);
  const block       = {timestamp, prevHash, hash, transaction};
  blockchain.push(block);
  return blockchain;
}

module.exports = newBlockchain, addBlock;
