const { Blockchain } = require('./blockchain');

const simplechain = new Blockchain;

simplechain.addBlock('new block');

for (const block of simplechain.chain) {
  console.log(block);
}
