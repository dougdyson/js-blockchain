const { Blockchain } = require('./blockchain');


const simplechain = new Blockchain; //?

simplechain.addPendingTransaction('alice', 'bob', 100);

simplechain.pendingTransactions[0];//?

simplechain.minePendingTransactions('alice');//?

console.log('alice balance:', simplechain.getAddressBalance('alice'));//?

simplechain.minePendingTransactions('alice');//?

console.log('alice balance:', simplechain.getAddressBalance('alice'));//?

simplechain.pendingTransactions[0];//?

