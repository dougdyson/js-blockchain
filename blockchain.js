const { createHmac } = require('crypto');

class Blockchain {
  
  constructor() {
    this.chain = [this.addGenesisBlock()];
    this.powDifficulty = 0; // throttle speed
    this.miningReward = 100;
    this.pendingTransactions = [];
  }
  
  addGenesisBlock(){
    const timestamp    = Date.now();
    const prevHash     = '';
    const toAddress    = 'genesis-block';
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
  
  getLastBlock(){
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(toAddress){
    let hash = this.getLastBlock().hash;
    let nonce = 0;
    while (hash.substring(0, this.powDifficulty) != Array(this.powDifficulty + 1).join('0')) {
      nonce++;
      hash = this.calculateHash(hash + nonce);
    }
    this.chain = this.chain.concat(this.pendingTransactions);
    this.pendingTransactions = [];
    const pendingTransaction = this.addPendingTransaction(toAddress, '', this.miningReward);
    this.pendingTransactions.push(pendingTransaction);
    return this.chain;
  }
  
  addPendingTransaction(toAddress, fromAddress, amount){
    // need to add check for fromAddress balance >= amount
    // console.log( this.getAddressBalance(fromAddress));
    // if (this.getAddressBalance(fromAddress) < amount) {
    //   return false;
    // }
    const timestamp   = Date.now();
    const prevHash    = this.getLastBlock().hash;
    const hash        = this.calculateHash(timestamp + prevHash + toAddress + fromAddress + amount);
    return this.pendingTransactions.push({timestamp, prevHash, hash, toAddress, fromAddress, amount});
  }

  getAddressBalance(address){ 
    return this.chain.reduce((a,v) => {
      if (v.toAddress === address) a =+ v;
      if (v.fromAddress === address) a =- v;
    })
  }
  
}

module.exports = { Blockchain };
