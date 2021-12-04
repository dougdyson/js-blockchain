const { Blockchain } = require('./blockchain');

const simplechain = new Blockchain;

simplechain.setPoWDifficulty(0);

simplechain.addBlock('second block');
simplechain.addBlock('third block');

console.log(simplechain);

const lastBlock = simplechain.getLastBlock();
console.log(lastBlock);