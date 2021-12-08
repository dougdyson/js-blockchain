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
    const toAddress    = '';
    const fromAddress  = 'genesis-block';
    const amount       = 0;
    const hash         = this.calculateHash(timestamp + fromAddress + amount);
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
    
    // throttle via hash calculations
    let miningHash = this.getLastBlock().hash;
    let nonce = 0;
    while (miningHash.substring(0, this.powDifficulty) != Array(this.powDifficulty + 1).join('0')) {
      nonce++;
      miningHash = this.calculateHash(miningHash + nonce);
    }
    
    // add pending transactions to chain and reward mining address
    this.chain = this.chain.concat(this.pendingTransactions);
    this.pendingTransactions = [];
    const fromAddress = '';
    const amount      = this.miningReward;
    const signature   = '';
    const transaction = {toAddress, fromAddress, amount, signature}
    this.addPendingTransaction(transaction);
    return this.chain;
  }
  
  addPendingTransaction(transaction){
    // need to add check for fromAddress balance >= amount
    // i.e. if (this.getAddressBalance(fromAddress) < amount) {
    //          return false;
    //      }
    const timestamp   = Date.now();
    const prevHash    = this.getLastBlock().hash;
    const toAddress   = transaction.toAddress;
    const fromAddress = transaction.fromAddress;
    const amount      = transaction.amount;
    const signature   = transaction.signature;
    const hash        = this.calculateHash(timestamp + prevHash + toAddress + fromAddress + amount);
    const tx1 = {timestamp, prevHash, hash, toAddress, fromAddress, amount, signature};
    this.pendingTransactions.push(tx);
    return this.pendingTransactions;
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
