class Transaction {
  constructor(toAddress, fromAddress, amount){
    this.toAddress  = toAddress;
    this.fromAddress = fromAddress;
    this.amount = amount;
    this.timestamp = Date.now();
  }
}

module.exports = { Transaction };