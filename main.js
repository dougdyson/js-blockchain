const { Blockchain } = require('./blockchain');

const simplechain = new Blockchain;

simplechain.setPoWDifficulty(6);

simplechain.addBlock('second block');

console.log(simplechain);

