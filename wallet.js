const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const { createHmac } = require('crypto');

class Wallet {
  constructor(privateKey){
    this.publicKey  = ec.keyFromPrivate(privateKey).getPublic('hex');
  }

  calculateHash(data){
    return createHmac('sha256', this.publicKey).update(data).digest('hex');
  }

  signTransaction(fromAddress){
    if (this.publicKey !== fromAddress) {
      throw new Error('Public key does not match wallet address!');
    }

    const txHash = this.calculateHash(fromAddress.toString());
    return ec.sign(txHash, 'base64');

  }

  newTransaction(toAddress, amount){
    const fromAddress = this.publicKey;
    const signature = this.signTransaction(fromAddress);
    return {toAddress, fromAddress, amount, signature};
  }
}

  module.exports = { Wallet };
