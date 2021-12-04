const { Blockchain } = require('./blockchain');
const { Transaction } = require('./transaction');

const simplechain = new Blockchain;

const tx1 = new Transaction('Bob', 'Alice', 100);
const tx2 = new Transaction('Alice', 'Bob', 50);

simplechain.addTransaction(tx1);
simplechain.addTransaction(tx2);

const bobBalance = simplechain.getAddressBalance('Bob');

console.log(bobBalance);