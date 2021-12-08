const EC = require('elliptic').ec;
const { createHmac } = require('crypto');

class Wallet {
  constructor(privateKey){
    const ec = new EC('secp256k1');
    this.publicKey  = ec.keyFromPrivate(privateKey).getPublic('hex');
  }

  calculateHash(data){
    return createHmac('sha256', this.privateKey).update(data).digest('hex');
  }

  signTransaction(fromAddress){
    if (this.publicKey !== fromAddress) {
      throw new Error('Public key does not match wallet address!');
    }

    const txHash = this.calculateHash(fromAddress);
    const sig    = this.publicKey.sign(txHash, 'base64')

    this.signature = sig.toDER('hex');
  }
}

  module.exports = { Wallet };
