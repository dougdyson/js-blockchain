const { createHmac } = require('crypto');

const calculateHash = (data) => createHmac('sha256', 'secret').update(data).digest('hex');

class Block {
  constructor(transaction, prevHash) {
    this.timestamp = Date.now();
    const hash     = calculateHash(timestamp + prevHash + transaction);
    return {timestamp, prevHash, hash, transaction};
  }
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

class Blockchain {
  
  constructor(powDifficulty) {
    this.chain = [];
    this.powDifficulty = powDifficulty;
    this.addGenesisBlock();
  }

  getLastBlock(){
    return this.chain[this.chain.length - 1];
  }

  addGenesisBlock(){
    const timestamp   = Date.now();
    const transaction = 'genesis block';
    const hash        = calculateHash(this.timestamp + '' + transaction);
    console.log('genesis!');
    return this.chain.push(timestamp, '', hash, transaction);
  }

  addBlock(transaction){
    proofOfWork(this.powDifficulty);
    const prevHash  = this.chain.prevHash;
    const newBlock  = new Block(transaction, prevHash);
    return this.chain.push(newBlock);
  }

}

module.exports = { Blockchain, Block };
