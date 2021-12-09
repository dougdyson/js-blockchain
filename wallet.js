const { createHash } = require('crypto');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Wallet {
  constructor(privateKey){
    this.key = ec.keyFromPrivate(privateKey)
    this.publicKey = this.key.getPublic('hex');
  }

  calculateHash(data){
    return createHash('sha256').update(data).digest('hex');
  }
  
  newTransaction(toAddress, amount){

    const fromAddress = this.publicKey;
    
    const signatureHash = this.calculateHash(fromAddress);
    console.log('W signatureHash:');
    console.log(signatureHash);
    
    const signature = this.key.sign(signatureHash, 'hex');
    console.log('W signature:');
    console.log(signature);
    
    return {toAddress, fromAddress, amount, signature};
  }

}

  module.exports = { Wallet };
