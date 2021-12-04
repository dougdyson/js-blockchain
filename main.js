const { Blockchain } = require('./blockchain');
const { Transaction } = require('./transaction');

const simplechain = new Blockchain;

const tx1 = new Transaction('Bob', 'Alice', 100);
const tx2 = new Transaction('Alice', 'Bob', 50);

simplechain.addBlock(tx1);
simplechain.addBlock(tx2);

console.log(simplechain);