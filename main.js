const { Blockchain } = require('./blockchain');

const simplechain = new Blockchain(1);

simplechain.addBlock('second block');
simplechain.addBlock('third block');

for (const block of simplechain.chain) {
  console.log(`for => block.transaction: ${block.transaction}`);
}

const lastBlock = simplechain.getLastBlock()
console.log(`getLastBlock => lastBlock.transaction: ${lastBlock.transaction}`);
