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
  
  signTransaction(toAddress, amount){

    const fromAddress = this.publicKey;   
    const signatureHash = this.calculateHash(fromAddress);
    const signature = this.key.sign(signatureHash, 'hex');
    
    return {toAddress, fromAddress, amount, signature};
  }

}

module.exports = { Wallet };
