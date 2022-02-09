const { createHash } = require('crypto');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Blockchain {
  
  constructor(code, powDifficulty, reward){
    this.chain  = [this.addGenesisBlock()];
    this.code   = code; // ie. BTC, ETH, FLOW, etc.
    this.powDifficulty = powDifficulty; // mining throttle speed
    this.miningReward  = reward; // amount for successful mining
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
  
  setMiningReward(reward){
    this.miningReward = reward;
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
    
    // add pending transactions to chain and reset
    this.chain = this.chain.concat(this.pendingTransactions);
    this.pendingTransactions = [];
    
    // reward mining address
    const fromAddress = 'mining-reward';
    const amount      = this.miningReward;
    const signature   = '';
    this.addPendingTransaction({toAddress, fromAddress, amount, signature});
    return this.chain;
  }

  isValidTransaction(tx){
    // mining reward
    if (tx.fromAddress === 'mining-reward') return true;
    
    // check fromAccount balance vs amount
    if (this.getAddressBalance(tx.fromAddress) < tx.amount) {
      console.log(`INSUFFICENT FROM-ADDRESS BALANCE: ${this.getAddressBalance(tx.fromAddress)}`);
      return false;
    }
    // check for transaction signature
    if (!tx.signature || tx.signature.length === 0) {
      onsole.log(`NO SIGNATURE!`);
      return false;
    }
    // verify fromAddress transaction signature
    const key  = ec.keyFromPublic(tx.fromAddress, 'hex')
    const hash = this.calculateHash(tx.toAddress + tx.fromAddress + tx.amount);
    if (!key.verify(hash, tx.signature)) {
      console.log(`INVALID SIGNATURE!`);
      return false;
    } 
    // all transaction validity tests pass
    return true
  }
  
  addPendingTransaction(tx){
    if (this.isValidTransaction(tx)){
      tx.timestamp = Date.now();
      tx.prevHash  = this.getLastBlock().hash;
      tx.hash      = this.calculateHash(tx.toAddress + tx.fromAddress + tx.amount + tx.prevHash);
      this.pendingTransactions.push(tx);
      return this.pendingTransactions;
    } else {
      console.log(`Pending transaction not added!`);
      console.log(tx);
      return false;
    }
  }

  getAddressBalance(address){ 
    let balance = 0;
    // on-chain balance
    for (const block of this.chain) {
      if (block.toAddress === address) balance += block.amount;
      if (block.fromAddress === address) balance -= block.amount;
    }
    // existing pending transactions
    for (const block of this.pendingTransactions) {
      if (block.toAddress === address) balance += block.amount;
      if (block.fromAddress === address) balance -= block.amount;
    }
    return balance;
  }
}

module.exports = { Blockchain };
