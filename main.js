const { Blockchain } = require('./blockchain');

const simplechain = new Blockchain;

// 1 st tx
simplechain.addPendingTransaction('alice', 'bob', 50);

// 1st mine
simplechain.minePendingTransactions('alice');//?
console.log('alice balance:', simplechain.getAddressBalance('alice'));//?
console.log(simplechain.pendingTransactions);

// 2nd mine
simplechain.minePendingTransactions('alice');//?
console.log('alice balance:', simplechain.getAddressBalance('alice'));//?
console.log(simplechain);

