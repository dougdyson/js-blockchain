const { createHmac } = require('crypto');

class Blockchain {
  
  constructor() {
    this.chain = [this.addGenesisBlock()];
    this.powDifficulty = 0; // throttle speed
    this.pendingTransactions = [];
    this.miningReward = 100;
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
    const test = this.getLastBlock();
    console.log('lastBlock:');
    console.log(test);
    let hash = this.getLastBlock().hash;
    console.log('mine hash:', hash);
    let nonce = this.getLastBlock().nonce;
    while (hash.substring(0, this.powDifficulty) != Array(this.powDifficulty + 1).join('0')) {
      nonce++;
      hash = this.calculateHash(hash + nonce);
    }
    console.log(`BLOCK MINED by ${toAddress} for ${this.miningReward}`);
    const minedTransactions = this.pendingTransactions;
    this.pendingTransactions = [this.addPendingTransaction(toAddress, '', this.miningReward)];
    return this.chain.concat(minedTransactions);
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
    let balance = 0;
    for (const block of this.chain) {
      if (block.toAddress === address) balance += block.amount;
      if (block.fromAddress === address) balance -= block.amount;
    }
    return balance;
  }
  
}

module.exports = { Blockchain };
