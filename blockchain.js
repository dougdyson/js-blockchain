const { createHmac } = require('crypto');

class Blockchain {
  
  constructor() {
    this.chain = [this.addGenesisBlock()];
    this.powDifficulty = 0 // throttle speed
  }
  
  addGenesisBlock(){
    const timestamp    = Date.now();
    const prevHash     = '';
    const toAddress    = 'genesis block';
    const fromAddress  = '';
    const amount       = 0;
    const hash         = this.calculateHash(timestamp + toAddress + amount);
    return {timestamp, prevHash, hash, toAddress, fromAddress, amount};
  }
  
  calculateHash(data){
    return createHmac('sha256', 'secret').update(data).digest('hex');
  }
  
  setPoWDifficulty(difficulty){
    this.powDifficulty = difficulty;
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
  
  getLastBlock(){
    return this.chain[this.chain.length - 1];
  }

  addBlock(Transaction){
    this.proofOfWork();
    const timestamp   = Transaction.timestamp;
    const prevHash    = this.getLastBlock().hash;
    const toAddress   = Transaction.toAddress;
    const fromAddress = Transaction.fromAddress;
    const amount      = Transaction.amount;
    const hash        = this.calculateHash(timestamp + prevHash + Transaction);
    return this.chain.push({timestamp, prevHash, hash, toAddress, fromAddress, amount});
  }
  
}

module.exports = { Blockchain };
