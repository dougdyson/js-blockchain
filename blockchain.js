const { createHmac } = require('crypto');

const calculateHash = (data) => createHmac('sha256', 'secret').update(data).digest('hex');

// Proof-of-Work (PoW)
let difficulty = 1;

const newBlockchain = (difficulty) => {
  // set PoW difficulty
  difficulty = difficulty;
  // create genesis block 
  const prevHash    = '';
  const transaction = 'genesis block';
  const block       = newBlock(transaction, prevHash);
  return [block];
}

const newBlock = (transaction, prevHash) => {
  proofOfWork(difficulty); 
  const timestamp = Date.now();
  const hash      = calculateHash(timestamp + prevHash + transaction);
  const block     = {timestamp, prevHash, hash, transaction};
  return block;
}

// Proof-of-Work (PoW)
// This is not a real PoW, just a loop using hashing for illustrative purposes
// Was first rehashing block props while incrementing its nonce but it was TOO SLOW!!
// (p.s. PoW is essentially a transaction throttle)
const proofOfWork = (difficulty) => {
  let nonce = 0;
  let hash  = '';
  while (hash.substring(0, difficulty) != Array(difficulty + 1).join('0')) {
    nonce++;
    hash = calculateHash(nonce.toString());
  }
}

module.exports = { newBlockchain, newBlock };
