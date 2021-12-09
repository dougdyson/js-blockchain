const { createHash } = require('crypto');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Blockchain {
  
  constructor(reward) {
    this.chain  = [this.addGenesisBlock()];
    this.powDifficulty = 0; // throttle speed
    this.miningReward  = reward;
    this.pendingTransactions = [];
  }
  
  addGenesisBlock(){
    const toAddress    = '';
    const fromAddress  = 'genesis-block';
    const amount       = 0;
    const timestamp    = Date.now();
    const prevHash     = '';
    const hash         = this.calculateHash(timestamp + fromAddress + amount);
    return {toAddress, fromAddress, amount, timestamp, prevHash, hash};
  }
  
  calculateHash(data){
    return createHash('sha256').update(data).digest('hex');
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
    
    // add pending transactions to chain
    this.chain = this.chain.concat(this.pendingTransactions);
    this.pendingTransactions = [];
    
    // reward mining address
    const fromAddress = 'reward';
    const amount      = this.miningReward;
    const signature   = null;
    const transaction = {toAddress, fromAddress, amount, signature}
    this.addPendingTransaction(transaction);
    return this.chain;
  }

  isValidTransaction(tx) {
    // mining reward
    if (tx.fromAddress === 'reward') return true;
    
    // check fromAccount balance
    if (!this.getAddressBalance(tx.fromAddress) >= tx.amount) return false;
    
    // check for transaction signature
    if (!tx.signature || tx.signature.length === 0) return false;
    
    // verify fromAddress transaction signature
    const key  = ec.keyFromPublic(tx.fromAddress, 'hex')
    const hash = this.calculateHash(tx.toAddress + tx.fromAddress + tx.amount);
    return key.verify(hash, tx.signature);
  }
  
  addPendingTransaction(tx){
    if (this.isValidTransaction(tx)) {
      tx.timestamp   = Date.now();
      tx.prevHash    = this.getLastBlock().hash;
      tx.hash        = this.calculateHash(tx.toAddress + tx.fromAddress + tx.amount + tx.prevHash);
      this.pendingTransactions.push(tx)
    }
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
