const { Blockchain } = require('./blockchain');

const simplechain = new Blockchain;

simplechain.addPendingTransaction('alice', 'bob', 50);

simplechain.minePendingTransactions('alice');//?

console.log('alice balance:', simplechain.getAddressBalance('alice'));//?

simplechain.minePendingTransactions('alice');//?

console.log('alice balance:', simplechain.getAddressBalance('alice'));//?

console.log(simplechain);

