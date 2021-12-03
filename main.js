const { Blockchain } = require('./blockchain');

const simplechain = new Blockchain;

simplechain.chain; //?

simplechain.addBlock('second block');

for (let i = 0; i < simplechain.chain.length; i++) {
  const block = simplechain.chain[i];
  console.log(block);
}
