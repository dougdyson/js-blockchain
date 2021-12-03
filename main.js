const { Blockchain } = require('./blockchain');

const simplechain = new Blockchain;

simplechain.chain; //?

simplechain.addBlock('second block');

for (const block of simplechain.chain) {
  console.log(block);
}
