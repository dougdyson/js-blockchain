const { createHmac } = require('crypto');

class Blockchain {
  
  constructor() {
    this.chain = [];
    this.addGenesisBlock();
  }
  
  calculateHash(data){
    return createHmac('sha256', 'secret').update(data).digest('hex');
  }
  
  addGenesisBlock(){
    const timestamp    = Date.now();
    const prevHash     = '';
    const transaction  = 'genesis block';
    const hash         = this.calculateHash(timestamp + transaction);
    return this.chain.push({timestamp, prevHash, hash, transaction});
  }
  
  // for refactor to calculate hash from block properties
  proofOfWork(){
    const difficulty = 0 // increment integer to throttle
    let nonce = 0;
    let hash  = '';
    while (hash.substring(0, difficulty) != Array(difficulty + 1).join('0')) {
      nonce++;
      hash = this.calculateHash(nonce.toString());
    }
  }

  getLastBlock(){
    return this.chain[this.chain.length - 1];
  }
  
  addBlock(transaction){
    this.proofOfWork();
    const timestamp = Date.now();
    const prevHash  = this.getLastBlock().hash;
    const hash      = this.calculateHash(timestamp + prevHash + transaction);
    return this.chain.push({timestamp, prevHash, hash, transaction});
  }

}

module.exports = { Blockchain };
