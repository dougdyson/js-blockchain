const { createHmac } = require('crypto');
const { get } = require('https');

const calculateHash = (data) => createHmac('sha256', 'secret').update(data).digest('hex');

class Block {
  constructor(transaction, prevHash) {
    this.timestamp   = Date.now();
    this.prevHash    = prevHash;
    this.transaction = transaction;
    this.hash        = calculateHash(timestamp + prevHash + transaction);
  }
}

class Blockchain {
  
  constructor() {
    this.chain = [];
    this.addGenesisBlock();
  }

  getLastHash(){
    console.log(this.chain[this.chain.length - 1].prevHash);
    return this.chain[this.chain.length - 1].prevHash;
  }

  addGenesisBlock(){
    const timestamp   = Date.now();
    const prevHash    = '';
    const transaction = 'genesis block';
    const hash        = calculateHash(timestamp + '' + transaction);
    const genesisBlock = {timestamp, prevHash, hash, transaction}
    return this.chain.push(genesisBlock);
  }

  addBlock(transaction){
    proofOfWork();
    const prevHash  = this.getLastHash();
    const newBlock  = new Block(transaction, prevHash);
    return this.chain.push(newBlock);
  }

}

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

module.exports = { Blockchain, Block };
