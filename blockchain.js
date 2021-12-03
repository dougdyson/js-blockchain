const { createHmac } = require('crypto');

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
    this.chain = [newBlock('genesis block')];
    this.powDifficulty = powDifficulty;
  }

  getLastBlock(){
    return this.chain[this.chain.length - 1];
  }

  calculateHash(data){
    return createHmac('sha256', 'secret').update(data).digest('hex');
  }

  addGenesisBlock(){
    const timestamp   = Date.now();
    const transaction = 'genesis block';
    const hash        = calculateHash(timestamp + '' + transaction);
    this.chain.push(timestamp, '', hash, transaction);
  }

  addBlock(transaction){
    proofOfWork(this.powDifficulty);
    const prevHash = this.chain.prevHash;
    const newBlock = new Block(transaction, prevHash);
    this.chain.push(newBlock);
  }

}

module.exports = { Blockchain, Block };
