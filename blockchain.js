const { createHmac } = require('crypto');

const calculateHash = (data) => createHmac('sha256', 'secret').update(data).digest('hex');

// Proof-of-Work (PoW)
// This is not a real PoW, just a loop using hashing for illustrative purposes
// Was first rehashing block props while incrementing its nonce but it was TOO SLOW!!
// (p.s. PoW is essentially a transaction throttle)
const proofOfWork = () => {
  const difficulty = 1
  let nonce = 0;
  let hash  = '';
  while (hash.substring(0, difficulty) != Array(difficulty + 1).join('0')) {
    nonce++;
    hash = calculateHash(nonce.toString());
  }
}

class Blockchain {
  
  constructor() {
    this.chain = [];
    this.addGenesisBlock();
  }

  addGenesisBlock(){
    const timestamp    = Date.now();
    const prevHash     = '';
    const transaction  = 'genesis block';
    const hash         = calculateHash(timestamp + transaction);
    return this.chain.push({timestamp, prevHash, hash, transaction});
  }

  addBlock(transaction){
    proofOfWork();
    const timestamp = Date.now();
    const prevHash  = this.chain[this.chain.length - 1].hash;
    const hash      = calculateHash(timestamp + prevHash + transaction);
    return this.chain.push({timestamp, prevHash, hash, transaction});
  }

}

module.exports = { Blockchain };
