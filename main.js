const { Blockchain } = require('./blockchain');


const simplechain = new Blockchain;

(simplechain.addTransaction('Bob', 'genesisblock', 100)) ? console.log(simplechain) : console.log('Nay!');

// simplechain.addTransaction('Alice', 'Bob', 50);

// console.log(simplechain);

console.log(`genesis block balance: ${simplechain.getAddressBalance('genesis block')}`);
// console.log(`Alice's balance: ${simplechain.getAddressBalance('Alice')}`);