const { Blockchain } = require('./blockchain');
const { Transaction } = require('./transaction');

const simplechain = new Blockchain;

const tx1 = new Transaction('Bob', 'Alice', 100);
simplechain.addTransaction(tx1);

const tx2 = new Transaction('Alice', 'Bob', 150);
simplechain.addTransaction(tx2);

console.log(simplechain.getAddressBalance('Alice'));  //?
