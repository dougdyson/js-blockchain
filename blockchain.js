const { createHmac } = require('crypto');

class Blockchain {
  
  constructor() {
    this.chain = [this.addGenesisBlock()];
    this.powDifficulty = 0 // throttle speed
  }
  
  setPoWDifficulty(difficulty){
    this.powDifficulty = difficulty;
  }
  
  calculateHash(data){
    return createHmac('sha256', 'secret').update(data).digest('hex');
  }
  
  addGenesisBlock(){
    const timestamp    = Date.now();
    const prevHash     = '';
    const transaction  = 'genesis block';
    const hash         = this.calculateHash(timestamp + transaction);
    return {timestamp, prevHash, hash, transaction};
  }
  
  // for refactor to calculate hash from block properties
  proofOfWork(){
    let nonce = 0;
    let hash  = '';
    while (hash.substring(0, this.powDifficulty) != Array(this.powDifficulty + 1).join('0')) {
      nonce++;
      hash = this.calculateHash(nonce.toString());
    }
  }

  addBlock(transaction){
    this.proofOfWork();
    const timestamp = Date.now();
    const prevHash  = this.getLastBlock().hash;
    const hash      = this.calculateHash(timestamp + prevHash + transaction);
    return this.chain.push({timestamp, prevHash, hash, transaction});
  }
  
  getLastBlock(){
    return this.chain[this.chain.length - 1];
  }
  
}

class Transaction {
  constructor(buyer, seller, amount) {
    this.buyer  = buyer;
    this.seller = seller;
    this.amount = amount;
  }
}

module.exports = { Blockchain, Transaction };
